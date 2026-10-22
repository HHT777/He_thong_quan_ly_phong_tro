/**
 * apiConfig.js
 * Shared API configuration for both Vite (4173) and Apache (80).
 *
 *   const res = await fetch(`${API_CONFIG.BASE_URL}/bao-cao/tong-quan`);
 *   const data = await res.json();
 */
const API_CONFIG = {
  BASE_URL:
    window.location.protocol === "http:" && window.location.port === "4173"
      ? "/api"
      : "http://localhost:3001/api",
};

if (typeof window !== "undefined") {
  window.API_CONFIG = API_CONFIG;
}
