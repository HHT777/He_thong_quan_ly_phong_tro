document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelector("#tenantIssueForm")
    ?.addEventListener("submit", async (event) => {
      event.preventDefault();
      const message = document.querySelector("#issueMessage");
      try {
        await window.ApiClient.post(
          "/su-co",
          Object.fromEntries(new FormData(event.currentTarget).entries()),
        );
        event.currentTarget.reset();
        message.textContent = "Đã gửi sự cố thành công.";
      } catch (error) {
        message.textContent = error.message;
      }
    });
});
