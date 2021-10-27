const { Client } = require("@elastic/elasticsearch");

const client = new Client({
  cloud: {
    id: "Webir:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvJDJhMDE1NjE0ZjliMDQzYjVhMzM3OTQyYmFjNTE5ZTQxJGY5NDRhNmY0ZGQ5MzQwY2ZiODk3ZWVlNTBiYTAwZDgw",
  },
  auth: {
    username: "elastic",
    password: "65ZkBZpDhHPwEijEbsmQLQGC",
  },
});

exports.getAll = async (searchTerm) => {
  try {
    let query = {};

    if (searchTerm && searchTerm.length > 0) {
      query.match = {
        title: searchTerm,
      };
    } else {
      query.match_all = {};
    }

    const results = await client.search({
      index: "products",
      filterPath: ["hits.total.value", "hits.hits._source"],
      size: 1000,
      body: {
        query,
      },
    });

    return {
      status: "success",
      results,
    };
  } catch (error) {
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
            },
          },
          tiendas: {
            terms: {
              field: "store",
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
