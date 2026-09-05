export function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.add("active");
}

export function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove("active");
}
