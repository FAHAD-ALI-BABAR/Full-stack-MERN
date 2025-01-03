const express=require("express")
const mongoose=require("mongoose")
const post=require("./routes/api/posts")
const profile=require("./routes/api/profile")
const user=require("./routes/api/users")
const bodyparser=require("body-parser")
const passport=require("passport")
const app=express();
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json());
//database configuration
const database=require("./config/keys").mongoURI;
//connect to databse
mongoose.connect(database)
.then(()=>{
    console.log("connected to database");
})
.catch((err)=>{
    console.log("Not connecteddddd to database",err);
})

//passport middleware
app.use(passport.initialize());
require("./config/passport")(passport)

app.use("/api/users",user)
app.use("/api/profile",profile)
app.use("/api/post",post)

app.listen(5000,()=>{
    console.log("running");
    
})