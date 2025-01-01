const express=require("express");
const User = require("../../models/User");
const gravatar=require("gravatar")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken");
const keys = require("../../config/keys");
const passport=require("passport")

const router=express.Router();
router.get("/test",(req,res)=>{
    res.json({msg:"hellow my name is fahad user"})
})
const Validateregisterdata=require("../../Validations/register")
const ValidateLoginData=require("../../Validations/login")
router.post("/register",(req,res)=>{
    const {err,isvalid}=Validateregisterdata(req.body)
    console.log("Resigetred data:",req.body);
    
    //check validation
    if(!isvalid){
        return res.status(400).json(err)
    }
    User.findOne({email:req.body.email})
    .then(user=>{
        if(user){
            err.email="Email aready exists"
            return res.status(400).json(err)
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
    const {err,isvalid}=ValidateLoginData(req.body)
    console.log("login data: ",req.body);
    
    //check validation
    if(!isvalid){
        return res.status(400).json(err)
    }
    User.findOne({email})
    .then((user)=>{
        if(!user){
            err.email="Email doesnot found"
            return res.status(404).json(err)
        }
        bcrypt.compare(password,user.password)
        .then((ismatched)=>{
            if(ismatched){
                const payload={id:user.id,name:user.name,password:user.password};//create jwt payload
                  //sign token
                  jwt.sign(payload,keys.SecretKey,{expiresIn:3600},(err,token)=>{
                    res.json({
                        success:true,
                        token:"Bearer " + token
                    })
                  })
            
            }
            else{
                err.password="Password incorrectt"
             return res.status(404).json(err)
            }
        })
    })
})

router.get("/current",passport.authenticate("jwt",{session:false}),(req,res)=>{
    res.json({
        id:req.user.id,
        name:req.user.name,
        email:req.user.email
    })
})
module.exports=router;