const mongoose= require('mongoose');

const Schema=mongoose.Schema;

const pdts=new Schema({
    productId:{type:Number},
    productName:{type:String},
    price:{type:Number},
    stockAvailable:{type:Number},
    Category:{type:String}
});

const products=mongoose.model("products",pdts);
module.exports = products;  