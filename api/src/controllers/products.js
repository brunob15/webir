const products = require('../services/products');

exports.getAll = (req, res) => {
    products.getAll().then(response => {
        if (response.status === 'success') {
            const results = {
                total: response.results.body.hits.total.value,
                items: response.results.body.hits.hits.map(item => item._source)
            };
            res.send({
                status: 'success',
                results
            });    
        } else {
            res.status(500).send({
                status: 'error',
                error: response
            });
        }
    });
};
