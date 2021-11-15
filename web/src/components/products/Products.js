import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { getProducts } from "../../api/products";
import Product from "../product/Product";
import Filters from "../filters/Filters";
import "./Products.scss";

function Products({ searchTerm, setSearchTerm }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts(searchTerm).then((response) => {
      if (response.status === "success") {
        setProducts(response.results.items);
      }
    });
  }, [searchTerm]);

  return (
    <div className="products">
      <h1 className="title">Bebidas</h1>

      {products.length === 0 && (
        <h2 style={{ textAlign: "center" }}>No hay resultados</h2>
      )}

      <div className="products_content">
        <div className="filters">
          <Filters setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
        </div>
        <div className="products">
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              {products.map((product, index) => (
                <Grid item xs={12} md={3} key={`product-${index}`}>
                  <Product product={product} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default Products;
