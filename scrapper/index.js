const { scrapCategoryTI } = require("./scrapping/tienda-inglesa/scrapping");
const {
  scrapCategoryDB,
} = require("./scrapping/distribuidora-bebidas/scrapping");
const { run, createIndex } = require("./elasticsearch/store-products");
const config = require("./config.json");
const fs = require("fs");

// Scrapear cada pagina del archivo de configuracion
(async function () {
  await createIndex();
  let productsArray = [];
  for (let i = 0; i < config.length; i++) {
    for (let j = 0; j < config[i].pages.length; j++) {
      const name = config[i].name;
      const page = config[i].pages[j];
      let products = null;
      if (name === "distribuidora bebidas") {
        products = await scrapCategoryDB(
          page.url,
          page.category,
          page.store,
          page.brand
        );
      }
      if (name === "tienda inglesa") {
        products = await scrapCategoryTI(
          page.url,
          page.category,
          page.store,
          page.brand
        );
      }
      if (products) {
        productsArray = productsArray.concat(products);
      }
    }
  }
  run(productsArray).catch(console.log);
})().then();
