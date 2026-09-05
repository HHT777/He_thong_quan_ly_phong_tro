(function () {
  const config = window.API_CONFIG || { BASE_URL: "/api" };
  const TOKEN_KEY = "trohub_token";

  function getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }

  async function request(path, options = {}) {
    const headers = {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    };
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;

    const response = await fetch(`${config.BASE_URL}${path}`, {
      ...options,
      headers,
    });
    const body = await response.json().catch(() => ({}));

    if (!response.ok || body.success === false) {
      if (response.status === 401) localStorage.removeItem(TOKEN_KEY);
      throw new Error(body.message || `Request failed (${response.status})`);
    }

    return body;
  }

  window.ApiClient = {
    TOKEN_KEY,
    getToken,
    getUser: () => {
      try {
        return JSON.parse(localStorage.getItem("trohub_user") || "null");
      } catch {
        return null;
      }
    },
    isAuthenticated: () => Boolean(getToken()),
    homePath: () => {
      const root = window.location.pathname.includes("/pages/") ? "../" : "./";
      return `${root}${
        window.ApiClient.getUser()?.vai_tro === "KHACH_THUE"
          ? "pages/khach-thue/thong-tin-thue.html"
          : "pages/dashboard.html"
      }`;
    },
    redirectHome: () => {
      window.location.href = window.ApiClient.homePath();
    },
    login: async (credentials) => {
      const body = await request("/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      });
      localStorage.setItem(TOKEN_KEY, body.data.token);
      localStorage.setItem("trohub_user", JSON.stringify(body.data.user));
      return body.data;
    },
    logout: () => {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem("trohub_user");
    },
    get: (path) => request(path),
    post: (path, data) =>
      request(path, { method: "POST", body: JSON.stringify(data) }),
    put: (path, data) =>
      request(path, { method: "PUT", body: JSON.stringify(data) }),
    del: (path) => request(path, { method: "DELETE" }),
  };
})();
