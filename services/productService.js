const boom = require('@hapi/boom');
const Product = require('../models/product');
const pool = require('../libs/postgres.pool');
class ProductService {

    constructor() {
        this.pool = pool;
        this.pool.on('err', err => console.error(err));
    }

    async get() {
        const query = "SELECT * FROM productos";
        const rta = await this.pool.query(query);
        const products = rta.rows;
        return new Promise((resolve, reject) => {
            if (products.length) {
                resolve(products);
            } else {
                reject(boom.notFound('Base de datos vacia'));
            }
        })
    }

    async created(data) {
        const newProduct = new Product(data.name, data.price, data.category, data.image);
        const query = 'INSERT INTO productos(name,price,category,image)VALUES($1,$2,$3,$4)';
        const values = [newProduct.getName, newProduct.getPrice, newProduct.getCategory, newProduct.getImage];
        if (await this.pool.query(query, values)) {
            return newProduct
        }
        return null;
    }

    async find() {
        // const product = this.bDatos.find(prod => prod.id === idProduct); 
        //if (!product) {
        // throw boom.notFound('product not found')
        //}
        //if (!product.isBlock) {
        // throw boom.conflict('Producto bloqueado');
        //}
        const query = "SELECT * FROM productos";
        const rta = await this.pool.query(query);
        return rta.rows;
    }

    async update(id, changes) {
        const index = this.bDatos.findIndex(prod => prod.id === id);
        if (index === -1) {
            throw boom.notFound('Product Not found');
        }
        const product = this.bDatos[index];
        this.bDatos[index] = {
            ...product,
            ...changes
        }
        return this.bDatos[index];
    }

    async delete(id) {
        const index = this.bDatos.findIndex(prod => prod.id === id);
        if (index === -1) {
            throw boom.notFound('Product not found');
        }
        this.bDatos.splice(index, 1);
    }

}

module.exports = ProductService;