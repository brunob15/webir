const { Client } = require("@elastic/elasticsearch");

const client = new Client({
  cloud: {
    id: "Webir:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvJDg1ZmM1NTQwNjNlOTQxMTk4ZjE1YzY0Y2VhZGUxNjM3JDQ5OGJhMWRkM2I0YTRjODdhNjkyZDgzZjlkOGNlYWZj",
  },
  auth: {
    username: "elastic",
    password: "kdIcz9ILQp5MWueyPS4iFFxe",
  },
});

exports.getAll = async (params) => {
  try {
    const title = params.title;
    const brand = params.brand;
    const store = params.store;

    const must = [];
    if (title) {
      must.push({ match: { title } });
    }

    let brandsFilter = [];
    if (brand?.length) {
      brandsFilter = brand.map((element) => {
        return { match: { brand: element } };
      });
    }

    let storesFilter = [];
    if (store?.length) {
      storesFilter = store.map((element) => {
        return { match: { store: element } };
      });
    }

    const results = await client.search({
      index: "products",
      filterPath: ["hits.total.value", "hits.hits._source"],
      size: 1000,
      body: {
        query: {
          bool: {
            must: [
              ...must,
              {
                bool: {
                  should: [
                    ...brandsFilter
                  ]
                }
              },
              {
                bool: {
                  should: [
                    ...storesFilter
                  ]
                }
              }
            ]
          },
        },
      },
    });

    return {
      status: "success",
      results,
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      error,
    };
  }
};

// Obtener los filtros (locales y marcas)
exports.getFilters = async () => {
  try {
    const results = await client.search({
      index: "products",
      body: {
        aggs: {
          marcas: {
            terms: {
              field: "brand",
              size: 10000
            },
          },
          tiendas: {
            terms: {
              field: "store",
              size: 10000
            },
          },
        },
      },
    });

    const aggregations = results.body.aggregations || {};
    const filters = Object.keys(aggregations).map((filterName) => {
      return {
        title: filterName,
        values: getFilterValues(aggregations, filterName),
      };
    });

    return {
      status: "success",
      filters,
    };
  } catch (error) {
    return {
      status: "error",
      error,
    };
  }
};

function getFilterValues(aggregations, filterName) {
  return aggregations[filterName].buckets.map((bucket) => bucket.key);
}
