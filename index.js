// run `node index.js` in the terminal

const puppeteer = require('puppeteer');
const fs = require('fs');

const TIENDA_INGLESA_BEERS = 'https://www.tiendainglesa.com.uy/Categoria/Bebidas/Bebidas-con-alcohol/Cervezas/1001/1/3';
const PRODUCT_SELECTOR = 'card-product-section';

async function run(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  let beers = await page.evaluate((selector) => {
    const elements = document.getElementsByClassName(selector);
    const beers = [];
    let product;
    for (let element of elements) {
        product = {
          title: element.querySelector('.card-product-name').innerHTML,
          price: element.querySelector('.ProductPrice').innerHTML,
        };
        beers.push(product);
    }
    return beers;
  }, PRODUCT_SELECTOR);

  console.log('beers', beers);
  fs.writeFile('beers.json', JSON.stringify(beers), (err, data) => {});

  await browser.close();
};

run(TIENDA_INGLESA_BEERS);
