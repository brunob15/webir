const puppeteer = require("puppeteer");

const PRODUCT_SELECTOR = "#left-area > ul > li.product.type-product";
// const NEXT_PAGE_SELECTOR = ".Section > .wPageSelector:last-child > a";
// const POPUP_SELECTOR = ".PopupContainer .TextBlock";
const PRODUCT_NAME_SELECTOR = ".woocommerce-loop-product__title";
const PRODUCT_PRICE_SELECTOR = ".woocommerce-Price-amount";
const PRODUCT_LINK_SELECTOR = ".woocommerce-LoopProduct-link";
const PRODUCT_IMAGE_SELECTOR = ".attachment-woocommerce_thumbnail";

// Inicializar Chrome Headless
async function initBrowser() {
  const width = 1920;
  const height = 1600;
  const browser = await puppeteer.launch({
    defaultViewport: { width: width, height: height },
    headless: false,
    args: [`--window-size=${width},${height}`],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: width, height: height });

  return { browser, page };
}

// Hides the location selector popup (clicks on Montevideo)
async function hidePopUp(page) {
  await page.evaluate((selector) => {
    const location = document.querySelector(selector);
    if (location) {
      location.click();
    }
  }, POPUP_SELECTOR);
}

// Checks if there is next page
async function nextPage(page) {
  const nextPageURL = await page.evaluate((selector) => {
    const anchor = document.querySelector(selector);
    return anchor && anchor.href;
  }, NEXT_PAGE_SELECTOR);
  return nextPageURL;
}

async function getProductsFromPage(page, category, store, brand) {
  const selectors = {
    productSel: PRODUCT_SELECTOR,
    titleSel: PRODUCT_NAME_SELECTOR,
    priceSel: PRODUCT_PRICE_SELECTOR,
    imageSel: PRODUCT_IMAGE_SELECTOR,
    linkSel: PRODUCT_LINK_SELECTOR,
  };

  // Obtener los productos de una página
  return await page.evaluate(
    (selectors, category, store, brand) => {
      const { productSel, titleSel, priceSel, imageSel, linkSel } = selectors;
      const elements = document.querySelectorAll(productSel);
      console.log("Elements: ", elements);

      const products = [];
      let product;
      for (let element of elements) {
        const priceSelector = element.querySelectorAll(priceSel);
        // Precio con rebaja, donde el ultimo es la rebaja
        const price = priceSelector[priceSelector.length - 1];
        product = {
          title: element.querySelector(titleSel).textContent,
          price: price.textContent.replace("$", ""),
          image: element.querySelector(imageSel).src,
          link: element.querySelector(linkSel).href,
          category,
          store,
          brand,
        };
        products.push(product);
      }
      return products;
    },
    selectors,
    category,
    store,
    brand
  );
}

async function goToNextPage(page) {
  await page.waitForTimeout(3000);
  try {
    await page.waitForSelector(NEXT_PAGE_SELECTOR, { timeout: 10000 });
    await Promise.all([
      page.waitForNavigation(),
      page.click(NEXT_PAGE_SELECTOR),
    ]);
  } catch (err) {}
}

async function scrapCategoryDB(startUrl, category, store, brand) {
  const { browser, page } = await initBrowser();

  // Abrir página inicial
  await page.goto(startUrl);

  // // Cerrar modal. Si no, no funciona el link a las proximas paginas
  // await page.waitForSelector(POPUP_SELECTOR);
  // await hidePopUp(page);

  const products = [];
  // let hasNextPage;
  const productsPage = await getProductsFromPage(page, category, store, brand);
  // products.push(...productsPage);
  // do {
  //   // products.push(...productsPage);
  //   // Si hay más paginas, clickear en el botón de next page, esperar navegación y repetir el scrapping
  //   // hasNextPage = await nextPage(page);
  //   // if (hasNextPage) {
  //   //   await goToNextPage(page);
  //   // }
  // } while (hasNextPage);
  console.log(JSON.stringify(productsPage));
  await browser.close();
  return productsPage;
}

module.exports = {
  scrapCategoryDB,
};
