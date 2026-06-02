/*
  HOW TO CONNECT GOOGLE SHEETS
  1. Open the sheet.
  2. File > Share > Publish to web.
  3. Choose the correct tab, select CSV, publish.
  4. Paste the CSV link below.

  MENU sheet suggested headers:
  name, category, description, price, image, available

  COFFEE BEANS sheet suggested headers:
  name, roast, origin, weight, description, price, image, available
*/

window.BLISS_CONFIG = {
  businessName: "Bliss Coffee",
  whatsappNumber: "27000000000",
  googleMapsUrl: "https://maps.google.com/?q=Bliss%20Coffee",

  // Paste published CSV links here:
  menuSheetCsvUrl: "",
  beansSheetCsvUrl: "",

  fallbackMenu: [
    { name: "Cappuccino", category: "Coffee", description: "Classic espresso with steamed milk and foam.", price: "R32", available: "yes" },
    { name: "Americano", category: "Coffee", description: "Smooth espresso stretched with hot water.", price: "R28", available: "yes" },
    { name: "Iced Latte", category: "Cold Drinks", description: "Chilled espresso, milk and ice.", price: "R38", available: "yes" },
    { name: "Croissant", category: "Bakery", description: "Fresh, buttery and perfect with coffee.", price: "R35", available: "yes" },
    { name: "Breakfast Toastie", category: "Food", description: "Toasted breakfast favourite. Update from sheet.", price: "R58", available: "yes" }
  ],

  fallbackBeans: [
    { name: "Bliss House Blend", roast: "Medium", origin: "House blend", weight: "250g", description: "Balanced everyday coffee with chocolate notes.", price: "R120", available: "yes" },
    { name: "Dark Roast Beans", roast: "Dark", origin: "Blend", weight: "250g", description: "Bold body for milk-based coffee lovers.", price: "R130", available: "yes" },
    { name: "Single Origin", roast: "Medium", origin: "Seasonal", weight: "250g", description: "Rotating bean selection. Update from sheet.", price: "R150", available: "yes" }
  ]
};
