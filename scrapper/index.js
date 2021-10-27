const { scrapCategoryTI } = require("./scrapping/tienda-inglesa/scrapping");
const {
  scrapCategoryDB,
} = require("./scrapping/distribuidora-bebidas/scrapping");
const { run, createIndex } = require("./elasticsearch/store-products");
const dbConfig = require("./db_config.json");
const fs = require("fs");
// const config = require("./config.json");

// Scrapear cada pagina del archivo de configuracion
(async function () {
  // await createIndex();
  // for (let i = 0; i < config.pages.length; i++) {
  //   const page = config.pages[i];
  //   const products = await scrapCategoryTI(
  //     page.url,
  //     page.category,
  //     page.store,
  //     page.brand
  //   );
  //   run(products).catch(console.log);
  // }
  // await createIndex();
  let productsArray = [];
  for (let i = 0; i < dbConfig.pages.length; i++) {
    const page = dbConfig.pages[i];
    const products = await scrapCategoryDB(
      page.url,
      page.category,
      page.store,
      page.brand
    );
    productsArray = productsArray.concat(products);
    //   run(products).catch(console.log);
  }
  const data = JSON.stringify(products);
  fs.writeFileSync("distribuidora.json", data);
})().then();

// TODO: Scrapear páginas de otros lugares
