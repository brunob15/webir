const puppeteer = require("puppeteer");

const PRODUCT_SELECTOR = "#left-area > ul > li.product.type-product";
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

async function scrapCategoryDB(startUrl, category, store, brand) {
  const { browser, page } = await initBrowser();

  // Abrir página inicial
  await page.goto(startUrl);

  const productsPage = await getProductsFromPage(page, category, store, brand);
  await browser.close();
  return productsPage;
}

module.exports = {
  scrapCategoryDB,
};
