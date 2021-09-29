const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json())

// Load routes
require('./routes/products')(app);

const API_PORT = 3001;
app.listen(API_PORT, () => {
  console.log(`Server is running on port ${API_PORT}.`)
});
