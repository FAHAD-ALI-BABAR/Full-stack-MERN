const validator=require("validator");
const isempty = require("./check");

module.exports=function ValidateProfileData(data){
    let err={};

    data.Handle=!isempty(data.Handle)? data.Handle:""
    data.Skills=!isempty(data.Skills)? data.Skills:""
    data.Status=!isempty(data.Status)? data.Status:""
    
    if(!validator.isLength(data.Handle,{min:5,max:40})){
        err.Handle="Characters must be between 5 and 40";
    }
    if(validator.isEmpty(data.Handle)){
        err.Handle="Handle is required";
    }
   
    if(validator.isEmpty(data.Skills)){
        err.Skills="Skills are required";
    }
    
    if(validator.isEmpty(data.Status)){
        err.Status="STatus is required";
    }
    if(!isempty(data.Website)){
        if(!validator.isURL(data.Website)){
            err.Website="Enter valid URL"
        }
    }
    if(!isempty(data.Linkedin)){
        if(!validator.isURL(data.Linkedin)){
            err.Linkedin="Enter valid URL"
        }
    }
    if(!isempty(data.Github)){
        if(!validator.isURL(data.Github)){
            err.Github="Enter valid URL"
        }
    }
    if(!isempty(data.Facebook)){
        if(!validator.isURL(data.Facebook)){
            err.Facebook="Enter valid URL"
        }
    }
    if(!isempty(data.Instagram)){
        if(!validator.isURL(data.Instagram)){
            err.Instagram="Enter valid URL"
        }
    }
   
    return {
        err,
        isvalid:isempty(err) //it will be valid is errors are empty
    }
}