/**
 * include.util.js
 * Nạp các mảnh HTML dùng chung (sidebar, navbar, footer) vào trang
 * bằng fetch, để không phải copy/paste lại ở mỗi trang HTML.
 *
 * Cách dùng trong trang:
 *   <div data-include="../components/sidebar.html"></div>
 *   <script src="../assets/js/utils/include.util.js"></script>
 *   <script>
 *     includeAll().then(() => {
 *       // gọi các script khởi tạo sidebar/navbar sau khi HTML đã có mặt
 *     });
 *   </script>
 */
async function loadHtmlResource(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Không tải được " + url);
    return await res.text();
  } catch (err) {
    if (window.location.protocol !== "file:") throw err;

    return await new Promise((resolve, reject) => {
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.setAttribute("aria-hidden", "true");
      iframe.src = url;

      iframe.onload = () => {
        try {
          const doc = iframe.contentDocument || iframe.contentWindow.document;
          const html =
            doc && doc.body
              ? doc.body.innerHTML
              : doc.documentElement.outerHTML;
          resolve(html);
        } catch (error) {
          reject(error);
        } finally {
          iframe.remove();
        }
      };

      iframe.onerror = () => {
        iframe.remove();
        reject(new Error("Không tải được " + url));
      };

      document.body.appendChild(iframe);
    });
  }
}

async function includeAll() {
  const nodes = document.querySelectorAll("[data-include]");
  await Promise.all(
    Array.from(nodes).map(async (node) => {
      const url = node.getAttribute("data-include");
      try {
        node.outerHTML = await loadHtmlResource(url);
      } catch (err) {
        console.error(err);
        node.innerHTML =
          '<p style="padding:16px;color:#C24B3F">Không tải được thành phần: ' +
          url +
          "</p>";
      }
    }),
  );
  document.dispatchEvent(new CustomEvent("partials:ready"));
}
