const express=require("express")
const router=express.Router();
const mongoose=require("mongoose")
const passport=require("passport")
const Post=require("../../models/Post")
const ValidatePostData=require("../../Validations/post")
router.get("/test",(req,res)=>{
    res.json({msg:"hellow my name is fahad post"})
})

router.post("/",passport.authenticate("jwt",{session:false}),(req,res)=>{
    console.log(req.body);
    const {err,isvalid}=ValidatePostData(req.body)
    console.log("post data",req.body);
    
    if(!isvalid){
        return res.status(400).json(err)
    }
    const newpost=new Post({
        text:req.body.text,
        name:req.body.name,
        avatar:req.body.avatar,
        user:req.body.user
    })
    console.log(newpost);
    
    newpost.save().then(post=> res.json(post))
    });


 router.get("/",passport.authenticate("jwt",{session:false}),(req,res)=>{
    const err={}
    Post.find().then(posts=>{
        if (posts.length > 0) {
            return res.json(posts); // Return posts if found
        }
        err.nopost="there is not post"
        return res.status(404).json(err)
    }).catch(err=> res.status(404).json({err:"there is no post for tbis user"}))
 })




module.exports=router;