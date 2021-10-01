module.exports = (app) => {
    const products = require('../controllers/products.js');
    const router = require('express').Router();

    // Get all products
    router.get('/', products.getAll);

    // Get products filters
    router.get('/filters', products.getFilters);

    app.use('/api/products', router);
};
