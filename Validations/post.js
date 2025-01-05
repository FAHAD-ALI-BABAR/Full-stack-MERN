const validator=require("validator");
const isempty = require("./check");

module.exports=function ValidatePostData(data){
    let err={};

    data.text=!isempty(data.text)? data.text:""
    
    if(!validator.isLength(data.text,{min:5,max:100})){
        err.text="Text  must be betwween 5 to 100 characters"
    }
    if(validator.isEmpty(data.text)){
        err.text="text field is required"
    }
   
    
   
    return {
        err,
        isvalid:isempty(err)
    }
}