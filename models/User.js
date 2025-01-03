const express=require("express")
const mongoose=require("mongoose")


//create schema
const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    avatar:{
        type:String,      
    },
    date:{
        type:Date,
        default:Date.now,
    }
})
//creating model
module.exports=User=mongoose.model("User",UserSchema);