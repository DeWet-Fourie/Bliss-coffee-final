document.addEventListener("DOMContentLoaded", () => {
  const config = window.BLISS_CONFIG || {};
  document.querySelectorAll("[data-whatsapp]").forEach(link => {
    link.href = whatsappLink(link.dataset.whatsapp);
    link.target = "_blank";
    link.rel = "noreferrer";
  });

  const email = document.querySelector("#email-link");
  if (email && config.BRAND_EMAIL) email.href = `mailto:${config.BRAND_EMAIL}`;

  const maps = document.querySelector("#maps-link");
  if (maps && config.GOOGLE_MAPS_URL) maps.href = config.GOOGLE_MAPS_URL;

  const year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();
});
