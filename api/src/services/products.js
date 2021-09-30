const { Client } = require('@elastic/elasticsearch');

const client = new Client({
  node: 'http://localhost:9200'
});

exports.getAll = async () => {
    try {
        const results = await client.search({
            index: 'products',
            filterPath : [
                'hits.total.value',
                'hits.hits._source'
            ],
            size: 1000,
            body: {
              query: {
                match_all: {}
              }
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
