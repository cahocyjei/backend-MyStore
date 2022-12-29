const faker = require('faker');
class Product{
    
    constructor(id,name,price,category,image,isBlock){
        this.id=id;
        this.name=name;
        this.price = price;
        this.category=category;
        this.image= image;
        this.isBlock = isBlock;
    }

get getId(){
    return this.id;
}    
set setId(id){
    this.id = id;
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