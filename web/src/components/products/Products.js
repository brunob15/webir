import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { getProducts } from '../../api/products';
import Product from '../product/Product';
import { textAlign } from '@mui/system';

const Item = styled(Paper)(({ theme }) => ({
}));

function Products({ searchTerm }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts(searchTerm)
      .then(response => {
        if (response.status === 'success') {
          setProducts(response.results.items);
        }
      });
  }, [searchTerm]);

  return (
    <div className="products">
      <h1>Bebidas</h1>
      { products.length === 0 && <h2 style={{textAlign: 'center'}}>No hay resultados</h2> }
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          { 
            products.map(product => (
              <Grid item xs={12} md={3} key={product.title}>
                  <Product product={product} />
              </Grid>
            ))
          }
        </Grid>
      </Box>
    </div>
  );
}
  
export default Products;
