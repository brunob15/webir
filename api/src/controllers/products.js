const products = require('../services/products');

exports.getAll = (req, res) => {
    const searchTerm = req.query.searchTerm;
    
    products.getAll(searchTerm).then(response => {
        if (response.status === 'success') {
            const items = response.results.body.hits.hits || [];
            const results = {
                total: response.results.body.hits.total.value,
                items: items.map(item => item._source)
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
