var express = require("express");
var path   = require("path");
const controller=require("../control/controller");

var router=express.Router();

router.get('/', function(req, res){
    res.sendFile(path.join(__dirname,"../views/signin.html"));
})

router.get('/log_in',(req,res)=>{
  res.sendFile(path.join(__dirname,'../views/login.html'));
})

router.post("/signin",controller.addUser);

router.post("/login",controller.logUser);

module.exports=router;