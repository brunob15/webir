const { scrapCategoryTI } = require('./scrapping/tienda-inglesa/scrapping');
const { run, createIndex } = require('./elasticsearch/store-products');
const config = require('./config.json');

// Scrapear cada pagina del archivo de configuracion
(async function() {
  await createIndex();
  for (let i = 0; i < config.pages.length; i++) {
    const page = config.pages[i];
    const products = await scrapCategoryTI(page.url, page.category, page.store, page.brand);
    run(products).catch(console.log);
  }
})().then();

// TODO: Scrapear páginas de otros lugares
