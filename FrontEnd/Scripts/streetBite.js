const contentArea = document.querySelector("#contentArea");
const homeButton = document.querySelector("#homeButton");
const menuButton = document.querySelector("#menuButton");
const ordersButton = document.querySelector("#ordersButton");
const settingsButton = document.querySelector("#settingsButton");
const themeToggleSidebarButton = document.querySelector("#themeToggleSidebarButton");
const themeToggleIcon = document.querySelector("#themeToggleIcon");

const THEME_STORAGE_KEY = "streetbite-theme";

function applyTheme(theme) {
  const normalizedTheme = theme === "dark" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", normalizedTheme);
  localStorage.setItem(THEME_STORAGE_KEY, normalizedTheme);
  updateThemeControls(normalizedTheme);
}

function getCurrentTheme() {
  return localStorage.getItem(THEME_STORAGE_KEY) === "dark" ? "dark" : "light";
}

function toggleTheme() {
  const nextTheme = getCurrentTheme() === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
  return nextTheme;
}

function updateThemeControls(theme) {
  const isDark = theme === "dark";

  if (themeToggleSidebarButton) {
    themeToggleSidebarButton.setAttribute("aria-pressed", String(isDark));
    themeToggleSidebarButton.setAttribute(
      "aria-label",
      isDark ? "Voltar para modo claro" : "Ativar modo escuro"
    );
  }

  if (themeToggleIcon) {
    themeToggleIcon.textContent = isDark ? "☀" : "☾";
  }

  const themeLabel = document.querySelector("#themeLabel");
  if (themeLabel) {
    themeLabel.textContent = `Tema atual: ${isDark ? "Escuro" : "Claro"}`;
  }
}

window.applyTheme = applyTheme;
window.getCurrentTheme = getCurrentTheme;
window.toggleTheme = toggleTheme;

// Apply persisted theme as soon as shell script is loaded.
applyTheme(getCurrentTheme());

const pages = {
  home:           { html: "Iframes/home.html",           script: "../Scripts/home.js",            module: false, css: "../Styles/home.css" },
  menu:           { html: "Iframes/menu.html",           script: "../Scripts/menu.js",            module: false, css: "../Styles/menu.css" },
  requests:       { html: "Iframes/requests.html",       script: "../Scripts/requests.js",        module: false, css: "../Styles/requests.css" },
  settings:       { html: "Iframes/settings.html",       script: "../Scripts/settings.js",      module: false, css: "../Styles/settings.css" },
};

// Map href filenames to page keys for internal link interception
const hrefToPageKey = {
  "home.html": "home",
  "menu.html": "menu",
  "requests.html": "requests",
  "settings.html": "settings",
};

const pageToSidebarButton = {
  home: homeButton,
  menu: menuButton,
  requests: ordersButton,
  settings: settingsButton,
};

let currentPageScript = null;

function updateSidebarActive(pageKey) {
  const buttons = [homeButton, menuButton, ordersButton, settingsButton];
  buttons.forEach((button) => button?.classList.remove("is-active"));

  const activeButton = pageToSidebarButton[pageKey];
  activeButton?.classList.add("is-active");
}

async function loadPage(pageKey) {
  const page = pages[pageKey];
  if (!page) return;

  updateSidebarActive(pageKey);

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
  const pageButton = e.target.closest("button[data-load-page]");
  if (pageButton) {
    const pageKey = pageButton.dataset.loadPage;
    if (pageKey && pages[pageKey]) {
      e.preventDefault();
      loadPage(pageKey);
      return;
    }
  }

  const scrollButton = e.target.closest("button[data-scroll-target]");
  if (scrollButton) {
    const targetSelector = scrollButton.dataset.scrollTarget;
    if (targetSelector) {
      const targetElement = contentArea.querySelector(targetSelector);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
  }

  const anchor = e.target.closest("a[href]");
  if (!anchor) return;
  const filename = anchor.getAttribute("href").split("/").pop();
  const pageKey = hrefToPageKey[filename];
  if (pageKey) {
    e.preventDefault();
    loadPage(pageKey);
  }
});

homeButton.addEventListener("click", (e) => {
  e.preventDefault();
  loadPage("home");
});
menuButton.addEventListener("click", (e) => {
  e.preventDefault();
  loadPage("menu");
});
ordersButton.addEventListener("click", (e) => {
  e.preventDefault();
  loadPage("requests");
});
settingsButton.addEventListener("click", (e) => {
  e.preventDefault();
  loadPage("settings");
});

if (themeToggleSidebarButton) {
  themeToggleSidebarButton.addEventListener("click", () => {
    toggleTheme();
  });
}

// Load home page on startup
loadPage("home");
