const validator=require("validator");
const isempty = require("./check");

module.exports=function ValidateEducationData(data){
    let err={};

    data.University=!isempty(data.University)? data.University:""
    data.FieldOfStudy=!isempty(data.FieldOfStudy)? data.FieldOfStudy:""
    data.From=!isempty(data.From)? data.From:""

   

   
    if(validator.isEmpty(data.University)){
        err.University="University field is required"
    }
    if(validator.isEmpty(data.FieldOfStudy)){
        err.FieldOfStudy="Field of study field is required"
    }
    if(validator.isEmpty(data.From)){
        err.From="From field is required"
    }
    
   
    return {
        err,
        isvalid:isempty(err)
    }
}