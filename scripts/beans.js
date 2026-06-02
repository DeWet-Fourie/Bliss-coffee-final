const fallbackBeans = [
  { name: "Bliss House Blend", roast: "Medium", size: "250g", notes: "Chocolate, caramel, soft citrus", grind: "Beans / ground", price: "120", status: "available" },
  { name: "Morning Roast", roast: "Light-medium", size: "250g", notes: "Bright, clean and easy-drinking", grind: "Beans / ground", price: "135", status: "available" },
  { name: "Dark Comfort", roast: "Dark", size: "1kg", notes: "Bold body, cocoa finish", grind: "Beans only", price: "395", status: "available" }
];

function renderBeans(items) {
  const grid = document.querySelector("#beans-grid");
  const status = document.querySelector("#beans-status");
  if (!grid) return;
  if (status) status.textContent = `${items.length} bean options loaded`;

  grid.innerHTML = items.map(bean => {
    const soldOut = String(bean.status || "").toLowerCase() === "sold" || String(bean.status || "").toLowerCase() === "sold out";
    const message = bean.whatsapptext || `Hi Bliss Coffee, I want to buy ${bean.name} (${bean.size || ""}).`;
    return `
      <article class="bean-card ${soldOut ? "is-sold" : ""}">
        <div class="bean-label">${bean.roast || "Coffee beans"}</div>
        <h3>${bean.name || "Coffee beans"}</h3>
        <p>${bean.notes || "Fresh beans for home brewing."}</p>
        <dl>
          <div><dt>Size</dt><dd>${bean.size || "Ask"}</dd></div>
          <div><dt>Grind</dt><dd>${bean.grind || "Beans / ground"}</dd></div>
        </dl>
        <div class="item-bottom">
          <strong>${money(bean.price)}</strong>
          ${soldOut ? `<span class="sold-pill">Sold out</span>` : `<a href="${whatsappLink(message)}" target="_blank" rel="noreferrer">Buy beans</a>`}
        </div>
      </article>`;
  }).join("");
}

async function initBeans() {
  const status = document.querySelector("#beans-status");
  let beans = [];
  try {
    beans = await fetchSheet(window.BLISS_CONFIG?.BEANS_SHEET_CSV_URL);
    beans = beans.filter(item => item.name);
    if (!beans.length && window.BLISS_CONFIG?.FALLBACK_BEANS) beans = fallbackBeans;
  } catch (error) {
    console.error(error);
    beans = window.BLISS_CONFIG?.FALLBACK_BEANS ? fallbackBeans : [];
    if (status) status.textContent = "Could not load beans sheet. Showing fallback items.";
  }
  renderBeans(beans);
}

document.addEventListener("DOMContentLoaded", initBeans);
