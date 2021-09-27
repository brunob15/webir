// run `node index.js` in the terminal

const puppeteer = require('puppeteer');
const fs = require('fs');

const TIENDA_INGLESA_BEERS = 'https://www.tiendainglesa.com.uy/Categoria/Bebidas/Bebidas-con-alcohol/Cervezas/1001/1/3';
const PRODUCT_SELECTOR = 'card-product-section';
const NEXT_PAGE_SELECTOR = '.Section > .wPageSelector:last-child';

async function run(url) {
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
    await page.evaluate(() => {
      const location = document.querySelector('.PopupContainer .TextBlock');
      if (location) {
        location.click();
      }
    });
  };

  await page.goto(url);
  await page.waitForSelector('.PopupContainer .TextBlock');
  await hidePopUp();

  // Checks if there is next page
  const nextPage = async function() {
    const nextPageURL = await page.evaluate(() => {
        const anchor = document.querySelector('.Section > .wPageSelector:last-child > a');
        return anchor && anchor.href;
    });
    return nextPageURL;
  };

  const beers = [];
  let hasNextPage;
  do {
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

    hasNextPage = await nextPage();
    if (hasNextPage) {
        await page.waitForTimeout(3000);
        try {
          await page.waitForSelector('.Section > .wPageSelector:last-child > a', {timeout: 10000});
          await Promise.all([
            page.waitForNavigation(),
            page.click('.Section > .wPageSelector:last-child > a')
        ]);
        } catch(err) {}
    }
  } while(hasNextPage);

  fs.writeFile('beers.json', JSON.stringify(beers), (err, data) => {});

  await browser.close();
};

run(TIENDA_INGLESA_BEERS);
