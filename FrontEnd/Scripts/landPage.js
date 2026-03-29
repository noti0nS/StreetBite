import ApiService from "./service.js";

const api = new ApiService("http://localhost:8080");
const THEME_STORAGE_KEY = "streetbite-theme";

document.addEventListener("DOMContentLoaded", function () {
  const persistedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  const theme = persistedTheme === "dark" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", theme);

  api.getComandas().then((comandas) => console.log(comandas));
});
