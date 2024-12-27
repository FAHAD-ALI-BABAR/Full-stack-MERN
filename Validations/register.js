const validator=require("validator");
const isempty = require("./check");

module.exports=function ValidateRegisterData(data){
    let err={};

    data.name=!isempty(data.name)? data.name:""
    data.email=!isempty(data.email)? data.email:""
    data.password=!isempty(data.password)? data.password:""
    data.password2=!isempty(data.password2)? data.password2:""

    if(!validator.isLength(data.name,{min:2,max:20})){
        err="Name must be larger than 2 characters and smaller than 20"
    }
    if(validator.isEmpty(data.name)){
        err.name="Name field is required"
    }
    if(validator.isEmpty(data.email)){
        err.email="Email field is required"
    }
    if(!validator.isEmail(data.email)){
        err.email="Email is invalid"
    }
    if(validator.isEmpty(data.password)){
        err.password="Password field is required"
    }
    if(!validator.isLength(data.password,{min:5,max:25})){
        err.password="Password must be larger than 5 characters and smaller than 25 chracacter"
    }
    if(validator.isEmpty(data.password2)){
        err.password2="Confirm Password field is required"
    }
    if(!validator.equals(data.password,data.password2)){
        err.password2="Passwords should match"
    }
    return {
        err,
        isvalid:isempty(err)
    }
}