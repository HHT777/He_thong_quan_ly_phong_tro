/**
 * format.util.js — hàm định dạng dùng chung toàn frontend
 */
const FormatUtil = {
  /** 4250000 -> "4.250.000đ" */
  currency(value) {
    return new Intl.NumberFormat('vi-VN').format(Math.round(value)) + 'đ';
  },

  /** 86.4 -> "86,4 triệu đ" */
  million(value) {
    return value.toLocaleString('vi-VN', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + ' triệu đ';
  },

  /** 8.2 -> "8,2%" */
  percent(value) {
    return Math.abs(value).toLocaleString('vi-VN', { maximumFractionDigits: 1 }) + '%';
  },

  /** Date -> "Thứ Hai, 24 tháng 6, 2024" */
  longDate(date) {
    const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    return `${days[date.getDay()]}, ${date.getDate()} tháng ${date.getMonth() + 1}, ${date.getFullYear()}`;
  },

  /** Date -> "09:41" */
  hhmm(date) {
    return date.toTimeString().slice(0, 5);
  },

  /** Chạy số đếm lên từ 0 -> target trong 1 phần tử DOM (hiệu ứng cinematic) */
  countUp(el, target, { duration = 900, decimals = 0, suffix = '' } = {}) {
    const start = performance.now();
    const from = 0;
    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
      const value = from + (target - from) * eased;
      el.textContent = value.toLocaleString('vi-VN', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  },
};
