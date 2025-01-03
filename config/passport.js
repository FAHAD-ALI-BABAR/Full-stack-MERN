const jwtStrategy=require("passport-jwt").Strategy;
const Extractjwt=require("passport-jwt").ExtractJwt;
const mongoose=require("mongoose")
const User=mongoose.model("User")
const Keys=require("../config/keys");


const options={};
 options.jwtFromRequest=Extractjwt.fromAuthHeaderAsBearerToken();
 options.secretOrKey=Keys.SecretKey;
 module.exports=passport=>{
    passport.use(
        new jwtStrategy(options,(jwt_payload,done)=>{
            User.findById(jwt_payload.id).then(user=>{
                if(user){
                    return done(null,user)
                }
                return done(null,false)
            }).catch(err=>console.log(err)
            )
            

        })
    );
 }