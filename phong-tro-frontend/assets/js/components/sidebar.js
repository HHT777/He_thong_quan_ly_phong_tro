/**
 * sidebar.js — điều khiển sidebar sau khi được include vào trang
 * Gọi initSidebar() sau khi sự kiện 'partials:ready' xảy ra.
 */
function initSidebar() {
  const sidebar = document.querySelector("[data-sidebar]");
  const backdrop = document.querySelector("[data-sidebar-backdrop]");
  const openBtn = document.querySelector("[data-sidebar-open]");
  const closeBtn = document.querySelector("[data-sidebar-close]");
  if (!sidebar) return;

  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("trohub_user") || "null");
    } catch {
      return null;
    }
  })();
  const isTenant = user?.vai_tro === "KHACH_THUE";
  const tenantItems = [
    [
      "thong-tin-thue",
      "/pages/khach-thue/thong-tin-thue.html",
      "Thông tin thuê",
    ],
    ["tien-phai-tra", "/pages/khach-thue/tien-phai-tra.html", "Tiền phải trả"],
    [
      "thanh-toan-thue",
      "/pages/khach-thue/thanh-toan.html",
      "Theo dõi thanh toán",
    ],
    ["hop-dong-thue", "/pages/khach-thue/hop-dong.html", "Hợp đồng"],
    [
      "nhap-chi-so-dien",
      "/pages/khach-thue/nhap-chi-so-dien.html",
      "Nhập chỉ số điện",
    ],
    [
      "yeu-cau-gia-han",
      "/pages/khach-thue/yeu-cau-gia-han.html",
      "Yêu cầu gia hạn",
    ],
    [
      "yeu-cau-tra-phong",
      "/pages/khach-thue/yeu-cau-tra-phong.html",
      "Yêu cầu trả phòng",
    ],
    ["thong-bao-thue", "/pages/khach-thue/thong-bao.html", "Thông báo"],
    ["su-co-thue", "/pages/khach-thue/su-co.html", "Gửi sự cố"],
  ];
  const adminPages = new Set([
    "dashboard",
    "tai-san",
    "cu-dan",
    "hop-dong",
    "thu-chi",
    "phong",
    "coc",
    "cong-no",
    "dien-nuoc",
    "thanh-toan",
    "bao-cao",
    "thong-bao",
    "su-co",
    "tra-phong",
    "tien-phong",
  ]);
  const currentPage = document.body.getAttribute("data-active-page");

  if (isTenant) {
    const nav = sidebar.querySelector(".sidebar__nav");
    if (nav) {
      nav.innerHTML = tenantItems
        .map(
          ([page, href, label]) =>
            `<a href="${href}" class="nav-item" data-page="${page}"><span>${label}</span></a>`,
        )
        .join("");
    }
    if (
      adminPages.has(currentPage) &&
      !window.location.pathname.includes("/khach-thue/")
    ) {
      window.location.replace("/pages/khach-thue/thong-tin-thue.html");
      return;
    }
  }

  const normalizePageUrl = (href) => {
    if (!href) return href;
    if (
      /^https?:\/\//i.test(href) ||
      /^mailto:/i.test(href) ||
      href.startsWith("#")
    ) {
      return href;
    }

    let cleaned = href.trim().replace(/^\.?\/+/, "");
    while (cleaned.toLowerCase().startsWith("pages/")) {
      cleaned = cleaned.slice("pages/".length);
    }
    cleaned = cleaned.replace(/^\.?\/+/, "");

    const safePath = cleaned.replace(/^(?:pages\/)+/i, "");
    return `/pages/${safePath}`;
  };

  const normalizeCurrentPath = (value) => {
    if (!value) return value;
    return value.replace(/\/+(pages\/)+/gi, "/pages/");
  };

  const open = () => {
    sidebar.classList.add("is-open");
    if (backdrop) backdrop.classList.add("is-visible");
  };
  const close = () => {
    sidebar.classList.remove("is-open");
    if (backdrop) backdrop.classList.remove("is-visible");
  };

  openBtn && openBtn.addEventListener("click", open);
  closeBtn && closeBtn.addEventListener("click", close);
  backdrop && backdrop.addEventListener("click", close);

  sidebar.querySelectorAll(".nav-item").forEach((item) => {
    if (item.dataset.navBound === "true") return;
    item.dataset.navBound = "true";

    const href = item.getAttribute("href");
    if (href) item.setAttribute("href", normalizePageUrl(href));

    item.addEventListener("click", (event) => {
      const target = item.getAttribute("href");
      if (
        !target ||
        /^https?:\/\//i.test(target) ||
        /^mailto:/i.test(target) ||
        target.startsWith("#")
      )
        return;
      close();

      const normalized = normalizePageUrl(target);
      const currentPath = normalizeCurrentPath(window.location.pathname);
      if (normalized !== currentPath) {
        event.preventDefault();
        window.location.href = normalized;
      }
    });
  });

  const activePage = document.body.getAttribute("data-active-page");
  if (activePage) {
    sidebar.querySelectorAll(".nav-item").forEach((item) => {
      item.classList.toggle(
        "is-active",
        item.getAttribute("data-page") === activePage,
      );
    });
  }
}
