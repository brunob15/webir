const products = require("../services/products");

exports.getAll = (req, res) => {
  const params = req.query;
  products.getAll(params).then((response) => {
    if (response.status === "success") {
      const items = response.results.body.hits.hits || [];
      const results = {
        total: response.results.body.hits.total.value,
        items: items.map((item) => item._source),
      };
      res.send({
        status: "success",
        results,
      });
    } else {
      res.status(500).send({
        status: "error",
        error: response,
      });
    }
  });
};

exports.getFilters = async (req, res) => {
  products.getFilters().then((response) => {
    if (response.status === "success") {
      res.send({
        status: "success",
        filters: response.filters,
      });
    } else {
      res.status(500).send({
        status: "error",
        error: response,
      });
    }
  });
};
