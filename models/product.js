const faker = require('faker');
class Product{
    
    constructor(name,price,category,image){
        this.name=name;
        this.price = price;
        this.category=category;
        this.image= image;
    }

get getId(){
    return this.id;
}      
get getName(){
    return this.name;
}
set setName(name){
    this.name = name;
}

get getPrice(){
    return this.price;
}
set setPrice(price){
    this.price = price;
}

get getCategory(){
    return this.category;
}
set setCategory(category){
    this.price = category;
}

get getImage(){
    return this.image;
}
set setImage(image){
    this.image = image;
}
}

module.exports = Product;