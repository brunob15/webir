const { Client } = require('@elastic/elasticsearch');

const client = new Client({
  node: 'http://localhost:9200'
});

exports.getAll = async (searchTerm) => {
    try {
        let query = {};

        if (searchTerm && searchTerm.length > 0) {
            query.match = {
                title: searchTerm
            };
        } else {
            query.match_all = {};
        }

        const results = await client.search({
            index: 'products',
            filterPath : [
                'hits.total.value',
                'hits.hits._source'
            ],
            size: 1000,
            body: {
              query
            }
        });

        return {
            status: 'success',
            results
        };
    } catch(error) {
        return {
            status: 'error',
            error
        };
    }
};
