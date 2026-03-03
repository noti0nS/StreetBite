const contentArea = document.querySelector("#contentArea");
const homeButton = document.querySelector("#homeButton");
const menuButton = document.querySelector("#menuButton");
const ordersButton = document.querySelector("#ordersButton");

const pages = {
  home:           { html: "Iframes/home.html",           script: "../Scripts/home.js",            module: false, css: "../Styles/home.css" },
  menu:           { html: "Iframes/menu.html",           script: "../Scripts/menu.js",            module: false, css: "../Styles/menu.css" },
  requests:       { html: "Iframes/requests.html",       script: "../Scripts/requests.js",        module: false, css: "../Styles/requests.css" },
  createNewOrder: { html: "Iframes/createNewOrder.html", script: "../Scripts/createNewOrder.js",  module: true,  css: "../Styles/createNewOrder.css" },
  settings:       { html: "Iframes/settings.html",       script: null,                            module: false, css: "../Styles/settings.css" },
};

// Map href filenames to page keys for internal link interception
const hrefToPageKey = {
  "home.html": "home",
  "menu.html": "menu",
  "requests.html": "requests",
  "createNewOrder.html": "createNewOrder",
  "settings.html": "settings",
};

let currentPageScript = null;

async function loadPage(pageKey) {
  const page = pages[pageKey];
  if (!page) return;

  const response = await fetch(page.html);
  const html = await response.text();

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  contentArea.innerHTML = doc.body.innerHTML;

  // Swap page-specific CSS
  const pageCSSLink = document.getElementById("pageCSS");
  if (pageCSSLink && page.css) {
    pageCSSLink.href = page.css;
  }

  // Remove previous injected page script
  if (currentPageScript) {
    currentPageScript.remove();
    currentPageScript = null;
  }

  // Inject page script if defined
  if (page.script) {
    const script = document.createElement("script");
    script.src = page.script;
    if (page.module) script.type = "module";
    document.body.appendChild(script);
    currentPageScript = script;
  }
}

// Expose globally so page scripts can trigger navigation (e.g. menu.js after reload)
window.loadPage = loadPage;

// Intercept internal navigation links inside contentArea
contentArea.addEventListener("click", (e) => {
  const anchor = e.target.closest("a[href]");
  if (!anchor) return;
  const filename = anchor.getAttribute("href").split("/").pop();
  const pageKey = hrefToPageKey[filename];
  if (pageKey) {
    e.preventDefault();
    loadPage(pageKey);
  }
});

homeButton.addEventListener("click", () => loadPage("home"));
menuButton.addEventListener("click", () => loadPage("menu"));
ordersButton.addEventListener("click", () => loadPage("requests"));

// Load home page on startup
loadPage("home");
