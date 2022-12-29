const joi = require('joi');
const Product = require('../models/product');

const product = new Product();
product.id = joi.string().uuid();
product.name = joi.string().pattern(new RegExp(/^[a-zA-Z0-9\-]{8,25}$/)),
product.price = joi.string().pattern(new RegExp(/^[\d\.{2,4}] [COP]$/));
product.category = joi.string();
product.image = joi.string().uri();


const schemaCreateProduct = joi.object({
    name: product.name.required(),
    price:product.price.required(),
    category:product.category.required(),
    image:product.image.required(),
})

const shemaUpdateProduct = joi.object({
    name:product.name,
    price:product.price
})

const schemaGetProduct =joi.object({
    id:product.id.required()
})

module.exports = {
    schemaGetProduct,
    schemaCreateProduct,
    shemaUpdateProduct
}