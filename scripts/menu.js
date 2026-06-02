const fallbackMenu = [
  { category: "Coffee", name: "Flat White", description: "Double shot espresso with silky textured milk.", price: "38", popular: "yes" },
  { category: "Coffee", name: "Cappuccino", description: "Classic espresso, steamed milk and foam.", price: "36", popular: "yes" },
  { category: "Cold", name: "Iced Latte", description: "Espresso over ice with cold milk.", price: "42" },
  { category: "Food", name: "Breakfast Croissant", description: "Fresh croissant with savoury filling.", price: "65" },
  { category: "Sweet", name: "Cake Slice", description: "Ask what is fresh on the counter today.", price: "55" }
];

let menuItems = [];
let activeMenuCategory = "All";

function visibleMenuItems() {
  return activeMenuCategory === "All" ? menuItems : menuItems.filter(item => (item.category || "").toLowerCase() === activeMenuCategory.toLowerCase());
}

function renderMenuFilters() {
  const filters = document.querySelector("#menu-filters");
  if (!filters) return;
  const categories = ["All", ...new Set(menuItems.map(item => item.category).filter(Boolean))];
  filters.innerHTML = categories.map(category => `<button class="filter-button ${category === activeMenuCategory ? "is-active" : ""}" data-menu-filter="${category}">${category}</button>`).join("");
}

function renderMenu() {
  const grid = document.querySelector("#menu-grid");
  const status = document.querySelector("#menu-status");
  if (!grid) return;
  const items = visibleMenuItems();
  if (status) status.textContent = `${items.length} menu items loaded`;

  grid.innerHTML = items.map(item => {
    const message = item.whatsapptext || `Hi Bliss Coffee, I want to ask about ${item.name}.`;
    return `
      <article class="item-card">
        <div class="item-top">
          <span>${item.category || "Menu"}</span>
          ${String(item.popular || "").toLowerCase() === "yes" ? `<em>Popular</em>` : ""}
        </div>
        <h3>${item.name || "Menu item"}</h3>
        <p>${item.description || "Freshly prepared."}</p>
        <div class="item-bottom">
          <strong>${money(item.price)}</strong>
          <a href="${whatsappLink(message)}" target="_blank" rel="noreferrer">Ask / order</a>
        </div>
      </article>`;
  }).join("");
}

async function initMenu() {
  const status = document.querySelector("#menu-status");
  try {
    menuItems = await fetchSheet(window.BLISS_CONFIG?.MENU_SHEET_CSV_URL);
    menuItems = menuItems.filter(item => item.name);
    if (!menuItems.length && window.BLISS_CONFIG?.FALLBACK_MENU) menuItems = fallbackMenu;
  } catch (error) {
    console.error(error);
    menuItems = window.BLISS_CONFIG?.FALLBACK_MENU ? fallbackMenu : [];
    if (status) status.textContent = "Could not load menu sheet. Showing fallback items.";
  }
  renderMenuFilters();
  renderMenu();
}

document.addEventListener("click", event => {
  const button = event.target.closest("[data-menu-filter]");
  if (!button) return;
  activeMenuCategory = button.dataset.menuFilter;
  renderMenuFilters();
  renderMenu();
});

document.addEventListener("DOMContentLoaded", initMenu);
