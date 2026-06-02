# Bliss Coffee Website

## Files
- `index.html` — website structure
- `styles.css` — full styling
- `script.js` — Google Sheets CSV loader, filters, cards and animation
- `config.js` — edit this for WhatsApp, Maps and sheet links
- `assets/` — logo crop, hero image and favicon

## Google Sheets setup
Create two separate Google Sheets or two tabs published separately as CSV.

### Menu headers
`name, category, description, price, image, available`

### Coffee beans headers
`name, roast, origin, weight, description, price, image, available`

Publish each sheet/tab:
File > Share > Publish to web > choose tab > CSV > Publish.
Paste each CSV URL into `config.js`.

## Replace placeholders
In `config.js`, replace:
- `whatsappNumber`
- `googleMapsUrl`
- `menuSheetCsvUrl`
- `beansSheetCsvUrl`
