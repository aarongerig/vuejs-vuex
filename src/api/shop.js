/**
 * Mocking client-server processing
 */
const productList = [
  {
    id: 1,
    title: 'iPad 4 Mini',
    price: 500.01,
    inventory: 2,
  },
  {
    id: 2,
    title: 'H&M T-Shirt White',
    price: 10.99,
    inventory: 10,
  },
  {
    id: 3,
    title: 'Charli XCX - Sucker CD',
    price: 19.99,
    inventory: 5,
  },
];

export default {
  getProducts(cb) {
    setTimeout(() => cb(productList), 100);
  },

  buyProducts(products, cb, errorCb) {
    setTimeout(() => {
      // simulate random checkout failure.
      if (Math.random() > 0.5 || navigator.userAgent.indexOf('PhantomJS') > -1) {
        cb();
      } else {
        errorCb();
      }
    }, 100);
  },
};
