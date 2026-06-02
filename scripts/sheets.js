function parseCSV(text) {
  const rows = [];
  let row = [];
  let value = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const next = text[i + 1];

    if (char === '"' && inQuotes && next === '"') {
      value += '"';
      i++;
      continue;
    }

    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (char === "," && !inQuotes) {
      row.push(value.trim());
      value = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (value || row.length) {
        row.push(value.trim());
        rows.push(row);
      }
      row = [];
      value = "";
      if (char === "\r" && next === "\n") i++;
      continue;
    }

    value += char;
  }

  if (value || row.length) {
    row.push(value.trim());
    rows.push(row);
  }

  if (!rows.length) return [];

  const headers = rows[0].map(header => header.trim().replace(/^\uFEFF/, "").toLowerCase());
  return rows.slice(1).map(values => {
    const item = {};
    headers.forEach((header, index) => item[header] = values[index] || "");
    return item;
  });
}

async function fetchSheet(csvUrl) {
  if (!csvUrl) return [];
  const separator = csvUrl.includes("?") ? "&" : "?";
  const response = await fetch(`${csvUrl}${separator}cache=${Date.now()}`, { cache: "no-store" });
  if (!response.ok) throw new Error("Sheet failed to load");
  return parseCSV(await response.text());
}

function money(value) {
  if (!value) return "";
  const clean = String(value).trim();
  return clean.toLowerCase().startsWith("r") ? clean : `R${clean}`;
}

function whatsappLink(message) {
  const number = window.BLISS_CONFIG?.WHATSAPP_NUMBER || "";
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
