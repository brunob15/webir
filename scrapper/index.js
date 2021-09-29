const { scrapCategoryTI } = require('./scrapping/tienda-inglesa/scrapping');
const { run } = require('./elasticsearch/store-products');
const config = require('./config.json');

const TIENDA_INGLESA = 'tienda inglesa';

// Scrapear cada pagina del archivo de configuracion
config.pages.tiendaInglesa.forEach(page => {
  scrapCategoryTI(page.url, page.type, TIENDA_INGLESA).then(products => {
    run(products).catch(console.log)
  });
});

// TODO: Scrapear páginas de Iberpark
