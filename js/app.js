/**
 * ELECTRON — FIRA Autonomous Mobile Robotics
 * Application logic: bilingual engine, navigation, media fallbacks.
 *
 * Language resolution order:
 *   1. ?lang=en | ?lang=fa in the URL (shareable language links; not saved)
 *   2. The visitor's explicitly saved choice (localStorage)
 *   3. SITE_CONFIG.defaultLanguage  (js/config.js — the single source)
 *
 * Reset the saved choice: footer button, ?resetLang=1, or
 * ElectronI18n.reset() in the browser console.
 */
(function () {
    "use strict";

    var STORAGE_KEY = "electron.lang";
    var SUPPORTED = ["en", "fa"];
    var DIRECTION = { en: "ltr", fa: "rtl" };
    var FA_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

    if (typeof SITE_CONFIG === "undefined" || typeof TRANSLATIONS === "undefined") {
        console.error("[ELECTRON] js/config.js and js/translations.js must load before js/app.js.");
        document.documentElement.className = document.documentElement.className.replace("no-js", "js");
        return;
    }

    var DEFAULT_LANG = isSupported(SITE_CONFIG.defaultLanguage) ? SITE_CONFIG.defaultLanguage : "en";
    if (!isSupported(SITE_CONFIG.defaultLanguage)) {
        console.warn("[ELECTRON] SITE_CONFIG.defaultLanguage must be \"en\" or \"fa\". Falling back to \"en\".");
    }

    var root = document.documentElement;
    var currentLang = DEFAULT_LANG;

    /* ---------- Helpers ---------- */
    function isSupported(lang) { return SUPPORTED.indexOf(lang) !== -1; }

    var storage = {
        get: function () { try { return window.localStorage.getItem(STORAGE_KEY); } catch (e) { return null; } },
        set: function (v) { try { window.localStorage.setItem(STORAGE_KEY, v); } catch (e) { /* storage unavailable */ } },
        clear: function () { try { window.localStorage.removeItem(STORAGE_KEY); } catch (e) { /* storage unavailable */ } }
    };

    function getParams() {
        try { return new URLSearchParams(window.location.search); } catch (e) { return null; }
    }

    function t(key, lang) {
        var dict = TRANSLATIONS[lang || currentLang] || {};
        if (Object.prototype.hasOwnProperty.call(dict, key)) {
            return String(dict[key]).replace("{year}", String(new Date().getFullYear()));
        }
        var fallback = TRANSLATIONS.en && TRANSLATIONS.en[key];
        if (fallback === undefined) { console.warn("[ELECTRON] Missing translation key:", key); return ""; }
        return String(fallback);
    }

    function localizeDigits(text, lang) {
        if (lang !== "fa") return text;
        return text.replace(/[0-9]/g, function (d) { return FA_DIGITS[+d]; });
    }

    function setMeta(selector, value) {
        var el = document.head.querySelector(selector);
        if (el) el.setAttribute("content", value);
    }

    function setLink(rel, hreflang, href) {
        var sel = 'link[rel="' + rel + '"]' + (hreflang ? '[hreflang="' + hreflang + '"]' : "");
        var el = document.head.querySelector(sel);
        if (!el) {
            el = document.createElement("link");
            el.rel = rel;
            if (hreflang) el.hreflang = hreflang;
            document.head.appendChild(el);
        }
        el.href = href;
    }

    /* ---------- Resolve initial language ---------- */
    function resolveInitialLanguage() {
        var params = getParams();
        if (params) {
            if (params.has("resetLang")) {
                storage.clear();
                params.delete("resetLang");
                replaceQuery(params);
            }
            var fromUrl = params.get("lang");
            if (isSupported(fromUrl)) return fromUrl;
        }
        var saved = storage.get();
        if (isSupported(saved)) return saved;
        return DEFAULT_LANG;
    }

    function replaceQuery(params) {
        if (!window.history || !window.history.replaceState) return;
        var qs = params.toString();
        var url = window.location.pathname + (qs ? "?" + qs : "") + window.location.hash;
        try { window.history.replaceState(null, "", url); } catch (e) { /* file:// in some browsers */ }
    }

    /* ---------- Apply language ---------- */
    function applyLanguage(lang) {
        currentLang = lang;
        root.lang = lang;
        root.dir = DIRECTION[lang];

        // Text content
        document.querySelectorAll("[data-i18n]").forEach(function (el) {
            el.textContent = t(el.getAttribute("data-i18n"), lang);
        });

        // Attributes: data-i18n-attr="aria-label:key;title:key2"
        document.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
            el.getAttribute("data-i18n-attr").split(";").forEach(function (pair) {
                var parts = pair.split(":");
                if (parts.length === 2) el.setAttribute(parts[0].trim(), t(parts[1].trim(), lang));
            });
        });

        // Numerals
        document.querySelectorAll("[data-num]").forEach(function (el) {
            if (!el.hasAttribute("data-num-src")) el.setAttribute("data-num-src", el.textContent);
            el.textContent = localizeDigits(el.getAttribute("data-num-src"), lang);
        });
        document.querySelectorAll("[data-year]").forEach(function (el) {
            el.textContent = localizeDigits(el.textContent, lang);
        });

        // Language buttons
        document.querySelectorAll(".lang-btn").forEach(function (btn) {
            btn.setAttribute("aria-pressed", String(btn.getAttribute("data-lang") === lang));
        });

        // Menu toggle label reflects state
        updateMenuLabel();

        applyMetadata(lang);
    }

    function applyMetadata(lang) {
        document.title = t("meta.title", lang);
        setMeta('meta[name="description"]', t("meta.description", lang));
        setMeta('meta[property="og:title"]', t("meta.ogTitle", lang));
        setMeta('meta[property="og:description"]', t("meta.description", lang));
        setMeta('meta[property="og:locale"]', t("meta.locale", lang));
        setMeta('meta[property="og:locale:alternate"]', lang === "fa" ? "en_US" : "fa_IR");
        setMeta('meta[property="og:image:alt"]', t("meta.ogImageAlt", lang));
        setMeta('meta[name="twitter:title"]', t("meta.ogTitle", lang));
        setMeta('meta[name="twitter:description"]', t("meta.description", lang));

        var base = (SITE_CONFIG.siteUrl || "").trim();
        if (base) {
            if (base.charAt(base.length - 1) !== "/") base += "/";
            var current = base + "?lang=" + lang;
            setLink("canonical", null, current);
            setLink("alternate", "en", base + "?lang=en");
            setLink("alternate", "fa", base + "?lang=fa");
            setLink("alternate", "x-default", base);
            var ogUrl = document.head.querySelector('meta[property="og:url"]');
            if (!ogUrl) {
                ogUrl = document.createElement("meta");
                ogUrl.setAttribute("property", "og:url");
                document.head.appendChild(ogUrl);
            }
            ogUrl.setAttribute("content", current);
            setMeta('meta[property="og:image"]', base + "assets/images/robot-hero.png");
            setMeta('meta[name="twitter:image"]', base + "assets/images/robot-hero.png");
        }
    }

    /* ---------- Public: explicit switch / reset ---------- */
    function switchLanguage(lang, persist) {
        if (!isSupported(lang)) return;
        if (persist !== false) storage.set(lang);
        var params = getParams();
        if (params && params.has("lang")) { params.set("lang", lang); replaceQuery(params); }
        applyLanguage(lang);
    }

    function resetLanguage() {
        storage.clear();
        var params = getParams();
        if (params && params.has("lang")) { params.delete("lang"); replaceQuery(params); }
        applyLanguage(DEFAULT_LANG);
        var status = document.querySelector(".reset-status");
        if (status) status.textContent = t("footer.resetDone");
        return DEFAULT_LANG;
    }

    function checkParity() {
        var en = Object.keys(TRANSLATIONS.en), fa = Object.keys(TRANSLATIONS.fa);
        var missingInFa = en.filter(function (k) { return fa.indexOf(k) === -1; });
        var missingInEn = fa.filter(function (k) { return en.indexOf(k) === -1; });
        var used = {};
        document.querySelectorAll("[data-i18n]").forEach(function (el) { used[el.getAttribute("data-i18n")] = 1; });
        document.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
            el.getAttribute("data-i18n-attr").split(";").forEach(function (p) { var k = p.split(":")[1]; if (k) used[k.trim()] = 1; });
        });
        var undefinedKeys = Object.keys(used).filter(function (k) { return en.indexOf(k) === -1 || fa.indexOf(k) === -1; });
        var result = { enKeys: en.length, faKeys: fa.length, missingInFa: missingInFa, missingInEn: missingInEn, usedButUndefined: undefinedKeys, ok: !missingInFa.length && !missingInEn.length && !undefinedKeys.length };
        console.table ? console.table([{ en: en.length, fa: fa.length, missingInFa: missingInFa.length, missingInEn: missingInEn.length, usedButUndefined: undefinedKeys.length, ok: result.ok }]) : console.log(result);
        return result;
    }

    window.ElectronI18n = Object.freeze({
        get current() { return currentLang; },
        get defaultLanguage() { return DEFAULT_LANG; },
        get saved() { return storage.get(); },
        set: function (lang) { switchLanguage(lang, true); },
        reset: resetLanguage,
        checkParity: checkParity
    });

    /* ---------- Navigation ---------- */
    var menuToggle = document.querySelector(".menu-toggle");
    var mainNav = document.getElementById("main-nav");

    function updateMenuLabel() {
        if (!menuToggle) return;
        var open = menuToggle.getAttribute("aria-expanded") === "true";
        menuToggle.setAttribute("aria-label", t(open ? "a11y.menuClose" : "a11y.menuOpen"));
    }

    function setMenu(open) {
        if (!menuToggle || !mainNav) return;
        menuToggle.setAttribute("aria-expanded", String(open));
        mainNav.classList.toggle("is-open", open);
        updateMenuLabel();
    }

    function initNavigation() {
        if (menuToggle) {
            menuToggle.addEventListener("click", function () {
                setMenu(menuToggle.getAttribute("aria-expanded") !== "true");
            });
        }
        if (mainNav) {
            mainNav.addEventListener("click", function (e) {
                if (e.target.closest("a")) setMenu(false);
            });
        }
        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape" && menuToggle && menuToggle.getAttribute("aria-expanded") === "true") {
                setMenu(false);
                menuToggle.focus();
            }
        });
        window.matchMedia("(min-width: 1025px)").addEventListener("change", function (mq) { if (mq.matches) setMenu(false); });

        // Header state + back-to-top
        var header = document.querySelector(".site-header");
        var toTop = document.querySelector(".to-top");
        var ticking = false;
        function onScroll() {
            var y = window.scrollY || window.pageYOffset;
            if (header) header.classList.toggle("is-scrolled", y > 8);
            if (toTop) toTop.classList.toggle("is-visible", y > 700);
            ticking = false;
        }
        window.addEventListener("scroll", function () {
            if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
        }, { passive: true });
        onScroll();

        // Active section highlighting
        var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav-list a[href^='#']"));
        if (!("IntersectionObserver" in window) || !navLinks.length) return;
        var linkFor = {};
        navLinks.forEach(function (a) { linkFor[a.getAttribute("href").slice(1)] = a; });
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                navLinks.forEach(function (a) { a.classList.remove("is-active"); a.removeAttribute("aria-current"); });
                var link = linkFor[entry.target.id];
                if (link) { link.classList.add("is-active"); link.setAttribute("aria-current", "true"); }
            });
        }, { rootMargin: "-45% 0px -50% 0px" });
        document.querySelectorAll("main section[id]").forEach(function (s) { observer.observe(s); });
    }

    /* ---------- Reveal on scroll ---------- */
    function initReveal() {
        var items = document.querySelectorAll(".reveal");
        var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduce || !("IntersectionObserver" in window)) {
            items.forEach(function (el) { el.classList.add("is-visible"); });
            return;
        }
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) { entry.target.classList.add("is-visible"); io.unobserve(entry.target); }
            });
        }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
        items.forEach(function (el) { io.observe(el); });
    }

    /* ---------- Media fallback (robot photograph) ---------- */
    function initMedia() {
        document.querySelectorAll("[data-media]").forEach(function (frame) {
            var img = frame.querySelector("img");
            if (!img) return;
            function markMissing() {
                frame.classList.add("is-missing");
                if (frame.hasAttribute("data-open-viewer")) frame.setAttribute("aria-disabled", "true");
            }
            function markLoaded() {
                frame.classList.remove("is-missing");
                frame.removeAttribute("aria-disabled");
            }
            if (img.complete) {
                if (img.naturalWidth === 0) markMissing(); else markLoaded();
            }
            img.addEventListener("error", markMissing);
            img.addEventListener("load", markLoaded);
        });
    }

    /* ---------- Image viewer ---------- */
    function initViewer() {
        var dialog = document.getElementById("viewer");
        if (!dialog || typeof dialog.showModal !== "function") return;
        var viewerImg = dialog.querySelector(".viewer-img");
        var lastTrigger = null;

        document.querySelectorAll("[data-open-viewer]").forEach(function (btn) {
            btn.addEventListener("click", function () {
                if (btn.classList.contains("is-missing")) return;
                var src = btn.querySelector("img");
                viewerImg.src = src.currentSrc || src.src;
                viewerImg.alt = src.alt;
                lastTrigger = btn;
                dialog.showModal();
            });
        });
        dialog.addEventListener("click", function (e) {
            if (e.target === dialog || e.target.closest("[data-close-viewer]")) dialog.close();
        });
        dialog.addEventListener("close", function () { if (lastTrigger) lastTrigger.focus(); });
    }

    /* ---------- Language controls ---------- */
    function initLanguageControls() {
        document.querySelectorAll(".lang-btn").forEach(function (btn) {
            btn.addEventListener("click", function () { switchLanguage(btn.getAttribute("data-lang"), true); });
        });
        document.querySelectorAll("[data-reset-lang]").forEach(function (btn) {
            btn.addEventListener("click", resetLanguage);
        });
    }

    /* ---------- Boot ---------- */
    function boot() {
        applyLanguage(resolveInitialLanguage());
        root.classList.remove("no-js");
        root.classList.add("js");
        initLanguageControls();
        initNavigation();
        initReveal();
        initMedia();
        initViewer();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", boot);
    } else {
        boot();
    }
})();
