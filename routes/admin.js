const { log } = require("console");
var express = require("express");
var path   = require("path");
const controller=require("../control/admincontroller");

var router=express.Router();

router.get('/', function(req, res){
    res.sendFile(path.join(__dirname,"../views/billing.html"));
})

router.post('/order/',controller.placeOrder);

router.get('/autocomplete/',controller.nameFilter);

router.get('/details/',controller.details);
 
router.get("/viewOrders/",controller.viewOrders);

router.get("/products/",controller.viewProducts);

router.post("/updateProduct/",controller.updateProduct);


module.exports=router;