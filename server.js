const express = require('express');
const app = express();

const PORT = 3001;

const searchEndpoint = require('./modules/search');

searchEndpoint(app);
 
app.listen(PORT);
