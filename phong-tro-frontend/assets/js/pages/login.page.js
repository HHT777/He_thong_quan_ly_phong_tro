document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const errorEl = document.getElementById("loginError");
  const button = form.querySelector("button");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    errorEl.textContent = "";
    button.disabled = true;

    try {
      const formData = new FormData(form);
      await window.ApiClient.login(Object.fromEntries(formData.entries()));
      window.ApiClient.redirectHome();
    } catch (error) {
      errorEl.textContent = error.message;
      button.disabled = false;
    }
  });
});
