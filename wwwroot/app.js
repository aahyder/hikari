
// app.js
// Set App Constants
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const path = require('path');
const port = process.env.PORT || 3000;
const paymentRouter = require("./routes/payments");
const app = express();

// EJS Middleware
app.set('view engine', 'ejs');

// Set Views Folder
app.set('views', path.join(__dirname, 'views'));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Index Route
app.get('/', (req, res) => {
    res.render('index');
});

// Payment Route
app.use('/payment', paymentRouter);

// 404 error
app.use((req, res, next) =>  {
    var err = new Error('404 ERROR: Page not found');
    err.status = 404;
    next(err);
})

// error handling
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send(err.message);
});

// run app
app.listen(port, () => {
    console.log(`app started on port ${port}`);
})