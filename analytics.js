// =====================================================
// analytics.js — Tracking pour le portfolio de Benjamin
// À inclure dans index.html et page_projet_1.html
// =====================================================

(function () {
  const STORAGE_KEY = "portfolio_analytics";
  const OWNER_FLAG  = "portfolio_owner";

  // Si ce navigateur est marqué comme propriétaire → on ne track rien
  if (localStorage.getItem(OWNER_FLAG) === "1") {
    console.log("[Analytics] Mode propriétaire — visite non comptée.");
    return;
  }

  function getData() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
        totalVisits: 0, visitors: [], pageViews: {}
      };
    } catch (e) {
      return { totalVisits: 0, visitors: [], pageViews: {} };
    }
  }

  function saveData(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function getVisitorId() {
    let id = sessionStorage.getItem("visitor_id");
    if (!id) {
      id = "v_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem("visitor_id", id);
    }
    return id;
  }

  function isNewSession() {
    const counted = sessionStorage.getItem("session_counted");
    if (!counted) {
      sessionStorage.setItem("session_counted", "1");
      return true;
    }
    return false;
  }

  function getPageName() {
    const path   = window.location.pathname;
    const params = new URLSearchParams(window.location.search);
    const projetId = params.get("projet");
    if (path.includes("page_projet_1")) {
      return projetId ? `Projet #${projetId}` : "Page Projet (inconnu)";
    }
    return "Accueil";
  }

  // ── DÉTECTION DE LA SOURCE ────────────────────────────────
  // Priorité : paramètre UTM > referrer HTTP > direct
  //
  // Comment ça marche :
  //   ?utm_source=linkedin  → vient de ton profil LinkedIn
  //   ?utm_source=email     → vient d'un e-mail
  //   referrer = linkedin   → plan B si UTM absent sur LinkedIn
  //   referrer = vide       → a tapé l'URL directement (ou favori)

  function detectSource() {
    const params   = new URLSearchParams(window.location.search);
    const utmSource = params.get("utm_source") || "";
    const utmMedium = params.get("utm_medium") || "";
    const referrer  = document.referrer || "";

    // 1) Paramètre UTM explicite (tes liens personnalisés)
    if (utmSource.toLowerCase().includes("linkedin")) {
      return { source: "LinkedIn", detail: "Lien profil LinkedIn" };
    }
    if (utmSource.toLowerCase().includes("email") ||
        utmMedium.toLowerCase().includes("email")) {
      return { source: "E-mail", detail: "Lien dans un e-mail" };
    }

    // 2) Referrer HTTP (plan B — moins fiable)
    if (referrer) {
      if (referrer.includes("linkedin.com")) {
        return { source: "LinkedIn", detail: "Lien profil LinkedIn" };
      }
      if (referrer.includes("mail.google.com") ||
          referrer.includes("outlook.live") ||
          referrer.includes("mail.yahoo") ||
          referrer.includes("webmail")) {
        return { source: "E-mail", detail: "Lien dans un e-mail" };
      }
      if (referrer.includes("google.") ||
          referrer.includes("bing.") ||
          referrer.includes("duckduckgo.") ||
          referrer.includes("yahoo.")) {
        try {
          return { source: "Moteur de recherche", detail: new URL(referrer).hostname };
        } catch {
          return { source: "Moteur de recherche", detail: referrer };
        }
      }
      // Autre site
      try {
        return { source: "Autre site", detail: new URL(referrer).hostname };
      } catch {
        return { source: "Autre site", detail: referrer.slice(0, 60) };
      }
    }

    // 3) Aucun referrer = accès direct (URL tapée, favori, ou app mobile)
    return { source: "Direct", detail: "URL tapée ou favori" };
  }

  function getVisitorInfo() {
    const { source, detail } = detectSource();
    return {
      id:        getVisitorId(),
      timestamp: new Date().toISOString(),
      page:      getPageName(),
      langue:    navigator.language || "inconnu",
      appareil:  /Mobi|Android/i.test(navigator.userAgent) ? "Mobile" : "Desktop",
      source,
      detail,
      referrer:  document.referrer || ""
    };
  }

  function trackVisit() {
    const data = getData();
    const info = getVisitorInfo();

    data.pageViews[info.page] = (data.pageViews[info.page] || 0) + 1;
    data.visitors.push(info);
    if (isNewSession()) data.totalVisits += 1;

    saveData(data);
    console.log("[Analytics] Visite enregistrée :", info);
  }

  trackVisit();
})();
