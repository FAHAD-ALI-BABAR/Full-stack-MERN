const express=require("express")
const router=express.Router();
const mongoose=require("mongoose")
const passport=require("passport")
const Profile=require("../../models/Profile")
const user=require("../../models/User")
const ValidateProfileData=require("../../Validations/profile")
router.get("/test",(req,res)=>{
    res.json({msg:"hellow my name is fahad profile"})
})

router.get("/",passport.authenticate("jwt",{session: false}),(req,res)=>{
    const errors={};
    Profile.findOne({user:req.user.id})
    .populate("Users",['name','avatar'])
    .then(profile=>{
        if(!profile){
            errors.notprofile="There is no profile for this user"
            return res.status(404).json(errors)
        }
        return res.json(profile)

    })
    .catch(err=> res.json(err))

})

router.post("/",passport.authenticate("jwt",{session: false}),(req,res)=>{
    const {err,isvalid}=ValidateProfileData(req.body)
    if(!isvalid){
        return res.status(400).json(err)
    }
    const profileFields={}
    profileFields.user=req.user.id
    if(req.body.Handle){
        profileFields.Handle=req.body.Handle
    }
    if(req.body.Company){
        profileFields.Company=req.body.Company
    }
    if(req.body.Description){
        profileFields.Description=req.body.Description
    }
    if(req.body.Website){
        profileFields.Website=req.body.Website
    }
    if(req.body.Location){
        profileFields.Location=req.body.Location
    }
    if(req.body.Status){
        profileFields.Status=req.body.Status
    }
    if(req.body.Bio){
        profileFields.Bio=req.body.Bio
    }
    if(req.body.Github){
        profileFields.Github=req.body.Github
    }
    if(req.body.Linkedin){
        profileFields.Linkedin=req.body.Linkedin
    }
    //skills
    if(typeof req.body.Skills!=="undefined"){
        profileFields.Skills=req.body.Skills.split(",")
    }
    //Socils
     profileFields.Socials={}
     if(req.body.Linkedin){
        profileFields.Socials.Linkedin=req.body.Linkedin
     }
     if(req.body.Github){
        profileFields.Socials.Github=req.body.Github
     }
     if(req.body.Facebook){
        profileFields.Socials.Facebook=req.body.Facebook
     }
     if(req.body.Instagram){
        profileFields.Socials.Instagram=req.body.Instagram
     }

     Profile.findOne({user:req.user.id}).then(profile=>{
        if(profile){
            //this means profile already exist ,then we will update the profile
            Profile.findOneAndUpdate(
                {user:req.user.id},
                {$set:profileFields},
                {new:true}).then(profile=>res.json(profile))
        }
        else{
            //profile doesnot exist ,create a profile
            Profile.findOne({Handle:profileFields.Handle}).then(profile=>{
                if(profile){
                    errors.Handle="profile handle exist"
                    return res.status(400).json(errors)
                }
                new Profile(profileFields).save().then(profile=>{
                    return res.json(profile)
                })
            })
        }
     })

})
module.exports=router;