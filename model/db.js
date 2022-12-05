const mongoose= require('mongoose');

const Schema=mongoose.Schema;

const auth=new Schema({
    name:{type:String},
    rollNo:{type:String,unique:true,required:true},
    password:{type:String},
    number:{type:Number}
});

const user=mongoose.model("users",auth);
module.exports = user;  