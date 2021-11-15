import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Box from "@mui/material/Box";
import "./Product.scss";

function Product({ product }) {
  return (
    <Card variant="outlined" className="product">
      <CardActionArea href={product.link} target="_blank" className="action-area">
        <CardMedia
          component="img"
          height="230"
          image={product.image}
          alt={product.title}
        />
        <CardContent className="card-content">
          <Typography gutterBottom variant="h5" component="div">
            $ {product.price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.title}
          </Typography>
          <Box display="flex" justifyContent="flex-end" mt={1}>
            <Typography
              style={{ textTransform: "capitalize" }}
              className={`brand brand-${product.store.toLowerCase().replace(' ', '-')}`}
              variant="caption"
              color="text.secondary"
            >
              {product.store}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default Product;
