export function renderTable(headers, rows) {
  const thHtml = headers.map((header) => `<th>${header}</th>`).join("");
  const trHtml = rows
    .map(
      (row) => `
        <tr>
          ${row.map((cell) => `<td>${cell}</td>`).join("")}
        </tr>
      `,
    )
    .join("");

  return `
    <table class="data-table">
      <thead>
        <tr>${thHtml}</tr>
      </thead>
      <tbody>${trHtml}</tbody>
    </table>
  `;
}
