//jshint esversion:6
const express=require("express");
const ejs=require("ejs");
const bodyparser=require("body-parser");
const mongoose=require("mongoose");
const encrypt=require("mongoose-encryption");
mongoose.connect("mongodb+srv://jainrachit122:9837977495@cluster0.yivryd3.mongodb.net/userdb",{useNewUrlParser:true});

const app=express();

app.use(express.static("public"));
app.set('view engine','ejs');
app.use(bodyparser.urlencoded({extended:true}));
const userschema=new mongoose.Schema({
    email:String,
    password:String
});

 
const secret="thisisourlittlesecret";
userschema.plugin(encrypt,{secret:secret,encryptedFields:["password"]});
const userr=new mongoose.model("user",userschema);
app.get("/",function(req,res){
    res.render("home");
});

app.get("/login",function(req,res){
    res.render("login");
});


app.get("/register",function(req,res){
    res.render("register");

});

app.post("/register",function(req,res){
    const newuser=new userr({
        email:req.body.username,
        password:req.body.password
    });
    newuser.save().then((success)=>res.render("secrets")).catch((err)=>console.log(err.message));

});

app.post("/login",function(req,res){
    const username=req.body.username;
    const password=req.body.password;
    // userr.findOne({email:username},function(err,found){
    //     if(err)
    //     {
    //         console.log(err);
    //     }
    //     else
    //     {
    //         if(found)
    //         {
    //             if(found.password===password)
    //             {
    //                 res.render("secrets");
    //             }
    //         }
    //     }
    // });

    userr.findOne({email:username })
 .then((found)=>{
    if(found.password===password)
    {
        res.render("secrets");
    }
 })
 .catch((err)=>{
     console.log(err);
 });
});
app.listen(3000,function(){
    console.log("server started on port 3000");
})

