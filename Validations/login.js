const validator=require("validator");
const isempty = require("./check");

module.exports=function ValidateLoginData(data){
    let err={};

    data.email=!isempty(data.email)? data.email:""
    data.password=!isempty(data.password)? data.password:""
   

   
    if(validator.isEmpty(data.email)){
        err.email="Email field is required"
    }
    if(!validator.isEmail(data.email)){
        err.email="Email is invalid"
    }
    if(validator.isEmpty(data.password)){
        err.password="Password field is required"
    }
   
    return {
        err,
        isvalid:isempty(err)
    }
}