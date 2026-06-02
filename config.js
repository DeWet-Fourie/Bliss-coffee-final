/*
  GOOGLE SHEETS SETUP
  1. Create two Google Sheets: one for menu, one for beans.
  2. File > Share > Publish to web > CSV.
  3. Paste the published CSV links below.

  MENU columns: name, category, description, price, popular
  BEANS columns: name, roast, notes, size, grind, price
*/
window.BLISS_CONFIG = {
  whatsappNumber: '270000000000',
  menuSheetCsv: '',
  beansSheetCsv: '',
  fallbackMenu: [
    { name:'Flat White', category:'Coffee', description:'Double shot espresso with silky textured milk.', price:'R38', popular:'yes' },
    { name:'Cappuccino', category:'Coffee', description:'Classic espresso, steamed milk and foam.', price:'R36', popular:'yes' },
    { name:'Iced Latte', category:'Cold', description:'Espresso over ice with cold milk.', price:'R42', popular:'' },
    { name:'Breakfast Croissant', category:'Food', description:'Fresh croissant with savoury filling.', price:'R65', popular:'' },
    { name:'Cake Slice', category:'Sweet', description:'Ask what is fresh on the counter today.', price:'R55', popular:'' },
    { name:'Americano', category:'Coffee', description:'Rich espresso lengthened with hot water.', price:'R30', popular:'' }
  ],
  fallbackBeans: [
    { name:'Bliss House Blend', roast:'Medium', notes:'Chocolate, caramel, soft citrus', size:'250g', grind:'Beans / ground', price:'R120' },
    { name:'Morning Roast', roast:'Light-medium', notes:'Bright, clean and easy-drinking', size:'250g', grind:'Beans / ground', price:'R135' },
    { name:'Dark Comfort', roast:'Dark', notes:'Bold body, cocoa finish', size:'1kg', grind:'Beans only', price:'R395' }
  ]
};
