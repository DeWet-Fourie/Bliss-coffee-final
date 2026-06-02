# Bliss Coffee Website

Clean static website split into editable files.

## Files
- `index.html` — page structure
- `styles.css` — full design styling
- `config.js` — WhatsApp, email, maps and Google Sheets links
- `scripts/sheets.js` — CSV parser and helpers
- `scripts/menu.js` — menu section from Google Sheets
- `scripts/beans.js` — beans-for-sale section from Google Sheets
- `scripts/main.js` — small global setup

## Google Sheets setup
Create two separate Google Sheets tabs/docs and publish each as CSV.

### Menu sheet columns
category,name,description,price,popular,whatsapptext

Example:
Coffee,Flat White,Double shot espresso with silky milk,38,yes,"Hi Bliss Coffee, I want a Flat White."

### Beans sheet columns
name,roast,size,notes,grind,price,status,whatsapptext

Example:
Bliss House Blend,Medium,250g,"Chocolate, caramel, soft citrus",Beans / ground,120,available,"Hi Bliss Coffee, I want to buy Bliss House Blend."

## Connect sheets
Open `config.js` and paste each published CSV link:

MENU_SHEET_CSV_URL: "your-menu-csv-link",
BEANS_SHEET_CSV_URL: "your-beans-csv-link",

Also update:
WHATSAPP_NUMBER, BRAND_EMAIL, GOOGLE_MAPS_URL

## Deploy
Upload everything to GitHub Pages. Keep the same folder structure.
