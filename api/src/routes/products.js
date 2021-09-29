module.exports = (app) => {
    const products = require('../controllers/products.js');
    const router = require('express').Router();

    // Get all products
    router.get('/', products.getAll);

    app.use('/api/products', router);
};
