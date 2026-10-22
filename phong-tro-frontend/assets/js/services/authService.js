const authService = {
  login: (payload) => window.ApiClient.login(payload),
  profile: () => window.ApiClient.get("/auth/profile"),
  logout: () => window.ApiClient.logout(),
};

if (typeof window !== "undefined") window.authService = authService;

export { authService };
