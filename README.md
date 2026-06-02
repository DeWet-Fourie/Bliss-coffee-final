# Bliss Coffee Premium Pitch Site

## Edit these files
- `index.html` — website structure and copy
- `styles.css` — full visual design
- `config.js` — WhatsApp number, Google Sheets links, fallback products
- `script.js` — loads menu and beans from CSV sheets
- `assets/bliss-logo.png` — uploaded Bliss logo

## Google Sheets columns

### Menu sheet
`name, category, description, price, popular`

### Beans sheet
`name, roast, notes, size, grind, price`

Publish each sheet as CSV and paste the links into `config.js`:

```js
menuSheetCsv: 'PASTE_MENU_CSV_LINK_HERE',
beansSheetCsv: 'PASTE_BEANS_CSV_LINK_HERE',
```

## Replace before pitch
- WhatsApp number in `config.js`
- Email in `index.html`
- Google Maps link in `index.html`
- Virtual tour link in the tour section

## Image note
The site uses external Unsplash-hosted coffee imagery for the pitch version. Replace with real Bliss photography after the shoot.
