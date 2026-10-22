/**
 * navbar.js — điều khiển navbar sau khi được include vào trang
 * Gọi initNavbar() sau khi sự kiện 'partials:ready' xảy ra.
 */
function initNavbar() {
  const dateEl = document.querySelector("[data-current-date]");
  const titleEl = document.querySelector("[data-page-title]");
  const pageTitle = document.body.getAttribute("data-page-name");

  if (dateEl) dateEl.textContent = FormatUtil.longDate(new Date());
  if (titleEl && pageTitle) {
    // Giữ lại icon mũi tên đã có trong markup, chỉ đổi phần chữ
    const arrow = titleEl.querySelector("svg");
    titleEl.textContent = pageTitle + " ";
    if (arrow) titleEl.appendChild(arrow);
  }

  const userButton = document.querySelector(".navbar__user");
  const userMenu = document.querySelector("#navbarUserMenu");
  const profileLink = document.querySelector("[data-profile-link]");
  const logoutButton = document.querySelector("[data-logout]");
  const directProfileLink = document.querySelector("[data-profile-direct]");
  const directLogoutButton = document.querySelector("[data-logout-direct]");
  let user = window.ApiClient?.getUser?.();
  if (!user) {
    try {
      user = JSON.parse(localStorage.getItem("trohub_user") || "null");
    } catch {
      user = null;
    }
  }

  if (user) {
    const displayName = user.ten_dang_nhap || "Tài khoản";
    const initials = displayName.slice(0, 2).toUpperCase();
    const role = user.vai_tro === "KHACH_THUE" ? "Khách thuê" : "Chủ tài sản";
    document
      .querySelector("[data-user-avatar]")
      ?.replaceChildren(document.createTextNode(initials));
    document
      .querySelector("[data-user-name]")
      ?.replaceChildren(document.createTextNode(displayName));
    document
      .querySelector("[data-user-role]")
      ?.replaceChildren(document.createTextNode(role));
    if (profileLink && user.vai_tro === "KHACH_THUE") {
      profileLink.href = "/pages/khach-thue/thong-tin-thue.html";
    }
    if (directProfileLink && user.vai_tro === "KHACH_THUE") {
      directProfileLink.href = "/pages/khach-thue/thong-tin-thue.html";
    }
  }

  if (userButton && userMenu) {
    userButton.addEventListener("click", () => {
      const isOpen = !userMenu.hidden;
      userMenu.hidden = isOpen;
      userButton.setAttribute("aria-expanded", String(!isOpen));
    });

    document.addEventListener("click", (event) => {
      if (!event.target.closest(".navbar__user-wrap")) {
        userMenu.hidden = true;
        userButton.setAttribute("aria-expanded", "false");
      }
    });
  }

  logoutButton?.addEventListener("click", () => {
    window.ApiClient?.logout?.();
    localStorage.removeItem("trohub_token");
    localStorage.removeItem("trohub_user");
    window.location.href = "/";
  });
  directLogoutButton?.addEventListener("click", () => {
    window.ApiClient?.logout?.();
    localStorage.removeItem("trohub_token");
    localStorage.removeItem("trohub_user");
    window.location.href = "/";
  });
}
