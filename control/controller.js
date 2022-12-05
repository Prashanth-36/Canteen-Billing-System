const user=  require('../model/db');
const path=require('path');
const alert= require('alert');
const bcrypt= require('bcryptjs');

const addUser = (req, res)=>{
    bcrypt.hash(req.body.pwd,10,(err,hash)=>{
        if(err){
            res.send("Hash error: "+err);
        }
        else{
            user.findOne({rollNo:req.body.rollNo}, (err,data)=>{
                if(err){
                    res.send(err);
                }
                else{
                    if(!data){
                        const User=new user({name:req.body.user,rollNo:req.body.rollNo,password:hash,number:req.body.numb});
                        User.save().then(data=>{
                            res.sendFile(path.join(__dirname,"../views/index.html"));
                        }).catch(err=>{
                            res.send("Save err: "+err);
                        })
                    }else{
                        alert("Entered roll number already exits!");
                    }
                }
            })
        }        
    });
};

const logUser=(req, res)=>{

    user.findOne({rollNo:req.body.rollNo}).then((data)=>{
        if(!data){
            alert("No user name found");
        }else{
            bcrypt.compare(req.body.pwd, data.password,(err,match)=>{
                if(err){
                    res.send("Hash err: "+err);
                }else if(match){
                    if(data.rollNo=="1"){
                        res.redirect("/admin/");                    
                    }
                    else{
                        res.sendFile(path.join(__dirname,"../views/index.html"));                    
                    }
                }
                else{
                    alert("password doesn't match the username.");
                }
            })
        }
    }).catch(err=>{
        console.log("Finding error: "+err);
    });
};

module.exports ={addUser,logUser};