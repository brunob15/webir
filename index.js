// run `node index.js` in the terminal

const puppeteer = require('puppeteer');
const fs = require('fs');

const TIENDA_INGLESA_BEERS = 'https://www.tiendainglesa.com.uy/Categoria/Bebidas/Bebidas-con-alcohol/Cervezas/1001/1/3';
const PRODUCT_SELECTOR = 'card-product-section';
const NEXT_PAGE_SELECTOR = '.Section > .wPageSelector:last-child > a';
const POPUP_SELECTOR = '.PopupContainer .TextBlock';

async function run(url) {
  // Inicializar Chrome Headless
  const width = 1920;
  const height = 1600;
  const browser = await puppeteer.launch({
    'defaultViewport' : { 'width' : width, 'height' : height },
    'headless': false,
    args: [`--window-size=${width},${height}`]
  });
  const page = await browser.newPage();
  await page.setViewport( { 'width' : width, 'height' : height } );

  // Hides the location selector popup (clicks on Montevideo)
  const hidePopUp = async function() {
    await page.evaluate((selector) => {
      const location = document.querySelector(selector);
      if (location) {
        location.click();
      }
    }, POPUP_SELECTOR);
  };

  // Abrir página y cerrar el modal
  await page.goto(url);
  await page.waitForSelector(POPUP_SELECTOR);
  await hidePopUp();

  // Checks if there is next page
  const nextPage = async function() {
    const nextPageURL = await page.evaluate((selector) => {
        const anchor = document.querySelector(selector);
        return anchor && anchor.href;
    }, NEXT_PAGE_SELECTOR);
    return nextPageURL;
  };

  const beers = [];
  let hasNextPage;
  do {
    // Obtener los productos de una página
    let beersPage = await page.evaluate((selector) => {
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

    console.log('beers page', beersPage);
    beers.push(...beersPage);

    // Si hay más paginas, clickear en el botón de next page,
    // esperar navegación y repetir el scrapping
    hasNextPage = await nextPage();
    if (hasNextPage) {
        await page.waitForTimeout(3000);
        try {
          await page.waitForSelector(NEXT_PAGE_SELECTOR, {timeout: 10000});
          await Promise.all([
            page.waitForNavigation(),
            page.click(NEXT_PAGE_SELECTOR)
          ]);
        } catch(err) {}
    }
  } while(hasNextPage);

  fs.writeFile('beers.json', JSON.stringify(beers), (err, data) => {});

  await browser.close();
};

run(TIENDA_INGLESA_BEERS);
