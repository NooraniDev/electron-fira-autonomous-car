/**
 * ELECTRON — FIRA Autonomous Mobile Robotics
 * Interactive UI: navigation, scroll spy, reveal motion, media fallback, and lightbox viewer.
 */
(function () {
    "use strict";

    var root = document.documentElement;
    root.classList.remove("no-js");
    root.classList.add("js");

    /* ---------- Current Year ---------- */
    var yearStr = String(new Date().getFullYear());
    document.querySelectorAll("[data-year]").forEach(function (el) {
        el.textContent = yearStr;
    });

    /* ---------- Mobile Menu & Scroll Spy ---------- */
    var menuToggle = document.querySelector(".menu-toggle");
    var mainNav = document.getElementById("main-nav");

    function setMenu(open) {
        if (!menuToggle || !mainNav) return;
        menuToggle.setAttribute("aria-expanded", String(open));
        menuToggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
        mainNav.classList.toggle("is-open", open);
    }

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
    window.matchMedia("(min-width: 961px)").addEventListener("change", function (mq) {
        if (mq.matches) setMenu(false);
    });

    var header = document.querySelector(".site-header");
    var toTop = document.querySelector(".to-top");
    var ticking = false;

    function onScroll() {
        var y = window.scrollY || window.pageYOffset;
        if (header) header.classList.toggle("is-scrolled", y > 8);
        if (toTop) toTop.classList.toggle("is-visible", y > 640);
        ticking = false;
    }
    window.addEventListener("scroll", function () {
        if (!ticking) {
            window.requestAnimationFrame(onScroll);
            ticking = true;
        }
    }, { passive: true });
    onScroll();

    var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav-list a[href^='#']"));
    if ("IntersectionObserver" in window && navLinks.length) {
        var linkMap = {};
        navLinks.forEach(function (a) { linkMap[a.getAttribute("href").slice(1)] = a; });
        var spy = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                navLinks.forEach(function (a) {
                    a.classList.remove("is-active");
                    a.removeAttribute("aria-current");
                });
                var active = linkMap[entry.target.id];
                if (active) {
                    active.classList.add("is-active");
                    active.setAttribute("aria-current", "true");
                }
            });
        }, { rootMargin: "-42% 0px -52% 0px" });

        document.querySelectorAll("main section[id]").forEach(function (sec) {
            spy.observe(sec);
        });
    }

    /* ---------- Reveal on Scroll ---------- */
    var reveals = document.querySelectorAll(".reveal");
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !("IntersectionObserver" in window)) {
        reveals.forEach(function (el) { el.classList.add("is-visible"); });
    } else {
        var revealIo = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    revealIo.unobserve(entry.target);
                }
            });
        }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
        reveals.forEach(function (el) { revealIo.observe(el); });
    }

    /* ---------- Robot Photograph Fallback & Lightbox ---------- */
    document.querySelectorAll("[data-media]").forEach(function (frame) {
        var img = frame.querySelector("img");
        if (!img) return;
        function markMissing() { frame.classList.add("is-missing"); }
        function markLoaded() { frame.classList.remove("is-missing"); }
        if (img.complete) {
            if (img.naturalWidth === 0) markMissing(); else markLoaded();
        }
        img.addEventListener("error", markMissing);
        img.addEventListener("load", markLoaded);
    });

    var dialog = document.getElementById("viewer");
    if (dialog && typeof dialog.showModal === "function") {
        var viewerImg = dialog.querySelector(".viewer-img");
        var lastTrigger = null;

        document.querySelectorAll("[data-open-viewer]").forEach(function (btn) {
            btn.addEventListener("click", function () {
                if (btn.classList.contains("is-missing")) return;
                var img = btn.querySelector("img");
                if (img && viewerImg) {
                    viewerImg.src = img.currentSrc || img.src;
                    viewerImg.alt = img.alt;
                }
                lastTrigger = btn;
                dialog.showModal();
            });
        });

        dialog.addEventListener("click", function (e) {
            if (e.target === dialog || e.target.closest("[data-close-viewer]")) {
                dialog.close();
            }
        });
        dialog.addEventListener("close", function () {
            if (lastTrigger) lastTrigger.focus();
        });
    }
})();
