const boom = require('@hapi/boom');
const faker = require('faker');
const Product = require('../models/product');
const dto = require('../schemas/schemaProduct');
class ProductService {

    constructor() {
        this.bDatos = []
        this.generate();
    }

    generate() {
        for (let i = 0; i < 100; i++) {
            this.bDatos.push(
                new Product(
                    faker.datatype.uuid(),
                    faker.commerce.product(),
                    faker.commerce.price(20, 1000, 2, 'COP '),
                    faker.commerce.productMaterial(),
                    faker.image.imageUrl(200, 200),
                    faker.datatype.boolean()
                )
            )
        }
        return this.bDatos;
    }

    get(limit) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const data = [];
                if (limit <= this.bDatos.length) {
                    for (let i = 0; i < limit; i++) {
                        data.push(this.bDatos[i]);
                    }
                    resolve(data);
                }else{
                    reject(boom.notFound(`Base de datos excedida,
haga una peticiòn menor o igual a ${this.bDatos.length}`));
                }
                    
            }, 2500)
        })
    }

    async created(data) {
        const newProduct = new Product(
            faker.datatype.uuid(),
            data.name,
            data.price,
            data.category,
            data.image);

        //this.bDatos.push(newProduct);
        this.bDatos.splice(0, 0, newProduct);
        return newProduct;
    }

    async find(idProduct) {
        const product = this.bDatos.find(prod => prod.id === idProduct); 
       if (!product) {
        throw boom.notFound('product not found')
       }
       if (!product.isBlock) {
        throw boom.conflict('Producto bloqueado');
       }
        return product;
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