import ApiService from "./service.js";
import snackbar from "./components/snackbar.js";

const api = new ApiService();
const THEME_STORAGE_KEY = "streetbite-theme";

document.addEventListener("DOMContentLoaded", async function () {
  const persistedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  const theme = persistedTheme === "dark" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", theme);

  try {
    const comandas = await api.getComandas();
    console.log(comandas);
  } catch (error) {
    console.error("Erro ao carregar comandas:", error);
    snackbar.error(error.message || "Não foi possível carregar as comandas.");
  }
});
