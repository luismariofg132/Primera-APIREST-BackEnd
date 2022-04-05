const express = require('express');
const morgan = require('morgan');
const path = require('path');
const res = require('express/lib/response')
const app = express();
require('dotenv').config();

// Midlewares
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/', require('./routes/contacts'));


// Monte de servidor
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
    console.log('Server is running on port', app.get('port'));
});