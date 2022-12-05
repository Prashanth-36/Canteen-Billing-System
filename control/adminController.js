const order=  require('../model/orderdb');
const product=  require('../model/productdb');


const placeOrder = (req, res)=>{
    var lastId=order.find({},{orderId:1,_id:0}).sort({orderId:-1}).limit(1);
    lastId.exec((err,data)=>{
        if(err) {
            console.log(err);
        }
        else{
            var nextOrderId=data[0].orderId+1;
            for(let i=0;i<req.body.pdtid.length;i++){
                var prdt=new order( {productId:req.body.pdtid[i], productName:req.body.pdtname[i],quantity:req.body.qty[i],price:req.body.price[i],orderId:nextOrderId} );
                prdt.save().catch(
                    err=>console.log(err)
                );
            }
        }
        res.redirect("/admin");
    });
};


const nameFilter=function(req, res){
    var regex=new RegExp(req.query["term"],'i');
    var prdtnames=product.find({productName:regex},{"productName":1,"_id":0}).limit(10);
    prdtnames.exec((err,data)=>{
        let ar=[];
        if(err){
            console.log(err);
        }
        else{
            data.forEach(element => {
                ar.push(element.productName);
            });
            res.jsonp(ar);
        }
    })
}

const details=function(req,res){
    var pdtDetail=product.findOne({productName:req.query.name},{"productName":1,"price":1,"productId":1,"_id":0}).limit(10).sort({productName:1});
    pdtDetail.exec((err,data)=>{
        if(err){
            console.log(err);
        }
        res.jsonp(data);
    })
}

const viewOrders=function(req,res) {
    var pdtDetail=order.find({},{"productName":1,"orderId":1,"price":1,"productId":1,"_id":0}).limit(10).sort({orderId:1,productName:1});
    pdtDetail.exec((err,data)=>{
        if(err){
            console.log(err);
        }
        res.render('orders',{data:data});
    })
}

const viewProducts=function(req,res) {
    var pdtDetail=product.find({},{"_id":0}).limit(10).sort({productName:1});
    pdtDetail.exec((err,data)=>{
        if(err){
            console.log(err);
        }
        res.render('products',{data:data});
    })
}
const updateProduct=(req, res) =>{
    product.updateOne({productId:req.body.productId},{$set:req.body},(err, data) =>{
        if(err){
            console.log(err);
        }else{
            res.redirect("/admin/products/");
        }
    });
}

module.exports ={placeOrder,nameFilter,details,viewOrders,viewProducts,updateProduct};