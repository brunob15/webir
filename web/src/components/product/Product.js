import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Icon from '@mui/material/Icon';

function Product({ product }) {
    return (
        <Card variant="outlined" sx={{ maxWidth: 345 }}>
            <CardActionArea sx={{ height: 350 }} href={product.link} target="_blank">
                <CardMedia
                    component="img"
                    height="230"
                    image={product.image}
                    alt={product.title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        $ {product.price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {product.title}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default Product;
