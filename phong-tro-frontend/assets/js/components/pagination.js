export function renderPagination(currentPage = 1, totalPages = 1) {
  const pages = [];
  for (let i = 1; i <= totalPages; i += 1) {
    pages.push(
      `<button class="btn" data-page="${i}" ${i === currentPage ? "disabled" : ""}>${i}</button>`,
    );
  }
  return pages.join("");
}
