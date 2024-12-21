const express=require("express")
const router=express.Router();
router.get("/test",(req,res)=>{
    res.json({msg:"hellow my name is fahad profile"})
})
module.exports=router;