/**
 * ELECTRON — FIRA Autonomous Mobile Robotics
 * Central site configuration.
 *
 * ─────────────────────────────────────────────────────────────
 *  DEFAULT LANGUAGE
 *  This is the ONLY place where the default language is defined.
 *
 *    "en"  →  English (LTR)
 *    "fa"  →  Persian / Farsi (RTL)
 *
 *  Visitors who have explicitly chosen a language with the
 *  switcher keep their saved choice (localStorage). To test the
 *  default again, clear that choice with any of:
 *    • the "Reset language preference" button in the footer
 *    • opening the site with  ?resetLang=1
 *    • running  ElectronI18n.reset()  in the browser console
 * ─────────────────────────────────────────────────────────────
 *
 *  siteUrl — the final public URL of the website, WITH a trailing
 *  slash, e.g. "https://example.github.io/repo-name/".
 *  Leave empty until the deployment domain is confirmed. When set,
 *  canonical, hreflang and absolute Open Graph URLs are generated.
 */
const SITE_CONFIG = Object.freeze({
    defaultLanguage: "fa",
    siteUrl: ""
});
