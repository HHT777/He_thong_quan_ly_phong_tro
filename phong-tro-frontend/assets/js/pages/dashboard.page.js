const dashboardData = {
  owner: { greeting: "bạn" },
  stats: [],
  cashflow: { months: [], values: [], total: 0, delta: 0 },
  occupancy: { rented: 0, vacant: 0, rate: 0, delta: 0 },
  expiringContracts: [],
  receivables: [],
  activity: [],
};

/* ============ 2. ICON LIBRARY (SVG nhỏ gọn, dùng chung) ============ */
const ICONS = {
  home: '<path d="M3 21V9.5L12 3l9 6.5V21H14v-7h-4v7H3Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>',
  key: '<circle cx="8" cy="15" r="4" stroke="currentColor" stroke-width="1.8"/><path d="M11 12l9-9M17 6l2 2M14 9l2 2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  card: '<rect x="2.5" y="6" width="19" height="13" rx="2.4" stroke="currentColor" stroke-width="1.8"/><path d="M2.5 10h19" stroke="currentColor" stroke-width="1.8"/>',
  calendar:
    '<rect x="3" y="5" width="18" height="16" rx="2.4" stroke="currentColor" stroke-width="1.8"/><path d="M3 10h18M8 3v4M16 3v4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  plus: '<path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  arrowUp:
    '<path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>',
  arrowDown:
    '<path d="M12 5v14M19 12l-7 7-7-7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>',
  more: '<circle cx="5" cy="12" r="1.6" fill="currentColor"/><circle cx="12" cy="12" r="1.6" fill="currentColor"/><circle cx="19" cy="12" r="1.6" fill="currentColor"/>',
  chevronRight:
    '<path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  pay: '<path d="M12 2v20M17 6.5c0-1.9-2.2-3.5-5-3.5s-5 1.4-5 3.5c0 4 10 2.5 10 6.5 0 2.1-2.2 3.5-5 3.5s-5-1.6-5-3.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  issue:
    '<path d="M12 9v4M12 17h.01M10.3 3.9 2.7 17a2 2 0 0 0 1.7 3h15.2a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>',
  meter:
    '<path d="M4 19h16M6 19V9a6 6 0 0 1 12 0v10" stroke="currentColor" stroke-width="1.8"/><path d="M12 9v4l3 2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  contract:
    '<path d="M7 3h8l4 4v14H7V3Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M10 12h6M10 16h6M10 8h2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  info: '<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/><path d="M12 11v5M12 8h.01" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
};
const svg = (name, size = 18) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">${ICONS[name] || ""}</svg>`;

/* ============ 3. RENDER ============ */
function renderHero() {
  const el = document.getElementById("heroGreeting");
  if (el) el.textContent = `Chào buổi sáng, ${dashboardData.owner.greeting}`;
}

function renderStats() {
  const grid = document.getElementById("statGrid");
  if (!grid) return;
  grid.innerHTML = dashboardData.stats
    .map(
      (s, i) => `
    <div class="stat-card stat-card--${s.tone} reveal" style="animation-delay:${80 + i * 70}ms">
      <div class="stat-card__icon">${svg(s.icon, 18)}</div>
      <button class="stat-card__more" aria-label="Tuỳ chọn">${svg("more", 16)}</button>
      <div class="stat-card__label">${s.label}</div>
      <div class="stat-card__value mono-figure" data-countup='${JSON.stringify({ target: s.value, decimals: s.decimals, suffix: s.suffix || "" })}'>0</div>
      <span class="delta delta--${s.dir === "up" ? "up" : "down"}">
        ${svg(s.dir === "up" ? "arrowUp" : "arrowDown", 13)}
        ${FormatUtil.percent(s.delta)} so với tháng trước
      </span>
    </div>`,
    )
    .join("");

  // Hiệu ứng đếm số chạy lên khi vào trang
  grid.querySelectorAll("[data-countup]").forEach((el) => {
    const cfg = JSON.parse(el.getAttribute("data-countup"));
    FormatUtil.countUp(el, cfg.target, {
      decimals: cfg.decimals,
      suffix: cfg.suffix,
      duration: 1000,
    });
  });
}

function renderCashflow() {
  const { months, values, total, delta } = dashboardData.cashflow;
  document.getElementById("cashflowTotal").textContent =
    FormatUtil.million(total);
  document.getElementById("cashflowDelta").innerHTML =
    `${svg("arrowUp", 13)} ${FormatUtil.percent(delta)} so với kỳ trước`;

  const ctx = document.getElementById("cashflowChart");
  if (!ctx || typeof Chart === "undefined") return;
  const gradient = ctx.getContext("2d").createLinearGradient(0, 0, 0, 220);
  gradient.addColorStop(0, "rgba(19, 75, 112, 0.28)");
  gradient.addColorStop(1, "rgba(19, 75, 112, 0)");

  new Chart(ctx, {
    type: "line",
    data: {
      labels: months,
      datasets: [
        {
          data: values,
          borderColor: "#134B70",
          backgroundColor: gradient,
          borderWidth: 2.5,
          pointRadius: 4,
          pointBackgroundColor: "#fff",
          pointBorderColor: "#134B70",
          pointBorderWidth: 2,
          pointHoverRadius: 6,
          tension: 0.4,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 1100, easing: "easeOutQuart" },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "#201E43",
          padding: 10,
          cornerRadius: 10,
          displayColors: false,
          callbacks: { label: (c) => FormatUtil.million(c.parsed.y) },
        },
      },
      scales: {
        y: {
          ticks: {
            callback: (v) => v + "tr",
            color: "#5B6072",
            font: { size: 11 },
          },
          grid: { color: "#E2E4E8" },
          border: { display: false },
        },
        x: {
          ticks: { color: "#5B6072", font: { size: 11 } },
          grid: { display: false },
          border: { display: false },
        },
      },
    },
  });
}

function renderOccupancy() {
  const { rented, vacant, rate, delta } = dashboardData.occupancy;
  document.getElementById("occRented").textContent = rented;
  document.getElementById("occVacant").textContent = vacant;
  document.getElementById("occDelta").innerHTML =
    `Tỷ lệ lấp đầy tăng <b>${FormatUtil.percent(delta)}</b> so với tháng trước.`;

  const valueEl = document.getElementById("occRateValue");
  FormatUtil.countUp(valueEl, rate, { suffix: "%", duration: 1000 });

  const ctx = document.getElementById("occupancyChart");
  if (!ctx || typeof Chart === "undefined") return;
  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Đang thuê", "Đang trống"],
      datasets: [
        {
          data: [rented, vacant],
          backgroundColor: ["#134B70", "#B4791F"],
          borderWidth: 0,
        },
      ],
    },
    options: {
      cutout: "76%",
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        animateRotate: true,
        duration: 1100,
        easing: "easeOutQuart",
      },
      plugins: { legend: { display: false }, tooltip: { enabled: true } },
    },
  });
}

function initials(name) {
  return name
    .split(" ")
    .slice(-2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function renderExpiringContracts() {
  const el = document.getElementById("expiringList");
  if (!el) return;
  el.innerHTML = dashboardData.expiringContracts
    .map(
      (c) => `
    <div class="list-row">
      <div class="avatar-chip">${initials(c.name)}</div>
      <div>
        <div class="list-row__title">${c.name}</div>
        <div class="list-row__sub">${c.room}</div>
      </div>
      <div class="list-row__end">
        <div class="list-row__amount" style="${c.urgent ? "color:var(--danger)" : ""}">${c.days} ngày</div>
        <div class="list-row__meta">${c.date}</div>
      </div>
    </div>`,
    )
    .join("");
}

function renderReceivables() {
  const el = document.getElementById("receivableList");
  if (!el) return;
  el.innerHTML = dashboardData.receivables
    .map(
      (r) => `
    <div class="list-row">
      <div class="avatar-chip">${initials(r.name)}</div>
      <div>
        <div class="list-row__title">${r.name}</div>
        <div class="list-row__sub">${r.room} · quá hạn ${r.overdue} ngày</div>
      </div>
      <div class="list-row__end">
        <div class="list-row__amount">${FormatUtil.currency(r.amount)}</div>
        <span class="list-row__tag list-row__tag--danger">Chưa thu</span>
      </div>
    </div>`,
    )
    .join("");
}

function renderActivity() {
  const el = document.getElementById("activityList");
  if (!el) return;
  const iconMap = {
    pay: ["pay", "pay"],
    issue: ["issue", "issue"],
    meter: ["meter", "meter"],
    contract: ["contract", "contract"],
  };
  el.innerHTML = dashboardData.activity
    .map((a) => {
      const [icon] = iconMap[a.type] || ["info"];
      return `
    <div class="activity-row">
      <div class="activity-row__icon activity-row__icon--${a.type}">${svg(icon, 15)}</div>
      <div>
        <div class="activity-row__title">${a.title}</div>
        <div class="activity-row__sub">${a.sub}</div>
      </div>
      <div class="activity-row__time">${a.time}</div>
    </div>`;
    })
    .join("");
}

function renderFooterStamp() {
  const el = document.querySelector("[data-updated-at]");
  if (el) el.textContent = FormatUtil.hhmm(new Date());
}

function formatDate(value) {
  return value ? new Date(value).toLocaleDateString("vi-VN") : "—";
}

function daysUntil(value) {
  return Math.max(0, Math.ceil((new Date(value) - new Date()) / 86400000));
}

async function loadDashboardData() {
  if (!window.ApiClient.isAuthenticated()) {
    window.location.href = "login.html";
    return false;
  }

  const now = new Date();
  const monthStart = new Date(
    now.getFullYear(),
    now.getMonth(),
    1,
  ).toISOString();
  const monthEnd = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
    23,
    59,
    59,
  ).toISOString();

  try {
    const [
      profileResponse,
      roomsResponse,
      contractsResponse,
      billsResponse,
      paymentsResponse,
    ] = await Promise.all([
      window.ApiClient.get("/auth/profile"),
      window.ApiClient.get("/phong?limit=100"),
      window.ApiClient.get("/hop-dong/expiring"),
      window.ApiClient.get("/khoan-phai-thu?limit=100"),
      window.ApiClient.get(
        `/khoan-phai-thu/payment/stats?startDate=${encodeURIComponent(monthStart)}&endDate=${encodeURIComponent(monthEnd)}`,
      ),
    ]);

    const profile = profileResponse.data || {};
    const rooms = roomsResponse.data || [];
    const expiring = contractsResponse.data || [];
    const bills = billsResponse.data || [];
    const paymentStats = paymentsResponse.data || [];
    const rented = rooms.filter(
      (room) => room.trang_thai === "DANG_THUE",
    ).length;
    const vacant = rooms.filter((room) => room.trang_thai === "TRONG").length;
    const currentRevenue = paymentStats.reduce(
      (total, item) => total + Number(item.total_amount || 0),
      0,
    );
    const overdueBills = bills.filter(
      (bill) => bill.trang_thai_thanh_toan === "QUA_HAN",
    );
    const ownerName =
      profile.khachThue?.ho_ten || profile.ten_dang_nhap || "bạn";

    dashboardData.owner.greeting = ownerName;
    dashboardData.stats = [
      {
        label: "Tổng số phòng",
        value: rooms.length,
        decimals: 0,
        delta: 0,
        dir: "up",
        tone: "primary",
        icon: "home",
      },
      {
        label: "Phòng đang trống",
        value: vacant,
        decimals: 0,
        delta: 0,
        dir: "down",
        tone: "tealtint",
        icon: "key",
      },
      {
        label: "Phòng đang thuê",
        value: rented,
        decimals: 0,
        delta: 0,
        dir: "up",
        tone: "deeptint",
        icon: "card",
      },
      {
        label: "Doanh thu tháng này",
        value: currentRevenue / 1000000,
        decimals: 1,
        suffix: " tr",
        delta: 0,
        dir: "up",
        tone: "navytint",
        icon: "calendar",
      },
    ];
    dashboardData.cashflow = {
      months: [now.toLocaleDateString("vi-VN", { month: "short" })],
      values: [currentRevenue / 1000000],
      total: currentRevenue / 1000000,
      delta: 0,
    };
    dashboardData.occupancy = {
      rented,
      vacant,
      rate: rooms.length ? Math.round((rented / rooms.length) * 100) : 0,
      delta: 0,
    };
    dashboardData.expiringContracts = expiring.map((contract) => ({
      name: contract.khachThue?.ho_ten || "Chưa có tên",
      room: `Phòng ${contract.ma_phong}`,
      days: daysUntil(contract.ngay_ket_thuc),
      date: formatDate(contract.ngay_ket_thuc),
      urgent: daysUntil(contract.ngay_ket_thuc) <= 7,
    }));
    dashboardData.receivables = overdueBills.map((bill) => ({
      name: bill.khachThue?.ho_ten || `Khách thuê #${bill.ma_khach_thue}`,
      room: `Phòng ${bill.ma_phong}`,
      overdue: Math.max(
        1,
        Math.ceil((now - new Date(bill.han_thanh_toan)) / 86400000),
      ),
      amount: Number(bill.tong_phai_thanh_toan || 0),
    }));
    dashboardData.activity = [];
    return true;
  } catch (error) {
    const grid = document.getElementById("statGrid");
    if (grid)
      grid.innerHTML = `<div class="card" style="grid-column:1/-1">Không thể tải dữ liệu: ${error.message}</div>`;
    return false;
  }
}

/* ============ 4. INIT ============ */
async function initDashboard() {
  if (!(await loadDashboardData())) return;
  renderHero();
  renderStats();
  renderCashflow();
  renderOccupancy();
  renderExpiringContracts();
  renderReceivables();
  renderActivity();
  renderFooterStamp();
}

document.addEventListener("partials:ready", () => {
  initSidebar();
  initNavbar();
  initDashboard();
});
