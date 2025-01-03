const mongoose=require("mongoose")
const ProfileSchema=new mongoose.Schema({
    User:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users"
    },
    Handle:{
        type:String,
        required:true,
        max:40
    },
    Company:{
        type:String,
        
    },
    Description:{
        type:String,
        
    },
    Website:{
        type:String,
        
    },
    Location:{
        type:String,
        
    },
    Status:{
        type:String,
        required:true
    },
    Skills:{
        type:[String],
        required:true
    },
    Bio:{
        type:String,
       
    },
    
    Experience:[{
        Title:{
            type:String,
            required:true
            
        },
        Company:{
            type:String,
            required:true
           
        },
        Location:{
            type:String,
            
           
        },
        From:{
            type:Date,
            required:true
           
        },
        To:{
            type:Date,
            
            
        },
        Current:{
            type:Boolean,
            default:false
            
        },
        Description:{
            type:String,
            
            max:800
        }}],

        Education:[{
            University:{
                type:String,
           
            },
            Degree:{
                type:String,
                
            },
            FieldOfStudy:{
                type:String,
                
            },
            From:{
                type:Date,
               
            },
            To:{
                type:Date,
                
            },
            Current:{
                type:Boolean,
                default:false
            },
            Description:{
                type:String,
                
                max:800
            }}],
            Socials:{
                Linkedin:{
                    type:String,
                    
                },
                Github:{
                    type:String,
                    
                },
                Facebook:{
                    type:String,
                    
                },
                Instagram:{
                    type:String,
                   
                },
            }
        
})
module.exports=Profile=mongoose.model("profile",ProfileSchema);