const express=require("express");
const User = require("../../models/User");
const gravatar=require("gravatar")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken");
const keys = require("../../config/keys");

const router=express.Router();
router.get("/test",(req,res)=>{
    res.json({msg:"hellow my name is fahad user"})
})

router.post("/register",(req,res)=>{
    User.findOne({email:req.body.email})
    .then(user=>{
        if(user){
            return res.status(400).json({email:"Email already existed"})
        }
        else{
            const avatar=gravatar.url(req.body.email,{
                s:"100",//size
                r:"pg",//rating
                d:"mm"//default
            })
            const newuser=new User({
                name:req.body.name,
                email:req.body.email,
                avatar:avatar,
                password:req.body.password,
            });
            bcrypt.genSalt(10,(err,salt)=>{
                bcrypt.hash(newuser.password,salt,(err,hash)=>{
                    if(err) throw err;
                    newuser.password=hash;
                    newuser.save()
                    .then(user=>res.json(user))
                    .catch(err=>res.json(err))
                })
    
            })
        }  
    })
})

router.post("/login",(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
    User.findOne({email})
    .then((user)=>{
        if(!user){
            return res.status(404).json({email:"email not found"})
        }
        bcrypt.compare(password,user.password)
        .then((ismatched)=>{
            if(ismatched){
                const payload={id:user.id,name:user.name,password:user.password};
                  //sign token
                  jwt.sign(payload,keys.SecretKey,{expiresIn:3600},(err,token)=>{
                    res.json({
                        success:true,
                        token:"Bearer" + token
                    })
                  })
            
            }
            else{
             return res.status(404).json({password:"password Doesnot match"})
            }
        })
    })
})
module.exports=router;