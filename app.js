const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const dotenv=require('dotenv');
dotenv.config();

app.set("views", path.join(__dirname,"views"))
app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname,"public")));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json())

var auth=require('./routes/auth');
var admin=require('./routes/admin');

app.get('/',(req,res)=>{
  res.redirect("/auth");
});

app.use('/auth',auth);
app.use('/admin',admin);

const mongoose= require('mongoose');


mongoose.connect(process.env.URI , { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    app.listen(5050,()=>{
      console.log("server started on port 5050");
    })
  })
  .catch(err => console.log(err));


