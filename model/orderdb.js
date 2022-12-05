const mongoose= require('mongoose');

const Schema=mongoose.Schema;

const order=new Schema({
    orderId:{type:Number, unique:false,default:1,require:true},
    productId:{type:Number},
    productName:{type:String},
    price:{type:Number},
    quantity:{type:Number}
});

const orders=mongoose.model("orders",order);
module.exports = orders;  

