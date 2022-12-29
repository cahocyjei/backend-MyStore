const routerProduct = require('./products.router');
const express = require('express');

function routerApi(app){
    const router = express.Router();
    router.use("/products",routerProduct);
    app.use('/api/v1',router);
}

module.exports = routerApi;