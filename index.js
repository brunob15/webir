const fs = require('fs');
const { scrapCategoryTI } = require('./scrapping/tienda-inglesa/scrapping');
const config = require('./config.json');

// Scrapear cada pagina del archivo de configuracion
config.pages.tiendaInglesa.forEach(page => {
  scrapCategoryTI(page.url).then(products => {
    fs.writeFile(page.output, JSON.stringify(products), (err, data) => {});
  });
});
