const { scrapCategoryTI } = require('./scrapping/tienda-inglesa/scrapping');
const { run } = require('./elasticsearch/store-products');
const config = require('./config.json');

// Scrapear cada pagina del archivo de configuracion
config.pages.tiendaInglesa.forEach(page => {
  scrapCategoryTI(page.url, page.type).then(products => {
    run(products).catch(console.log)
  });
});

// TODO: Scrapear páginas de Iberpark
