const validator=require("validator");
const isempty = require("./check");

module.exports=function ValidateExperienceData(data){
    let err={};

    data.Title=!isempty(data.Title)? data.Title:""
    data.Company=!isempty(data.Company)? data.Company:""
    data.From=!isempty(data.From)? data.From:""

   

   
    if(validator.isEmpty(data.Title)){
        err.Title="Title fields is required"
    }
    if(validator.isEmpty(data.Company)){
        err.Company="Company field is required"
    }
    if(validator.isEmpty(data.From)){
        err.From="From field is required"
    }
    
   
    return {
        err,
        isvalid:isempty(err)
    }
}