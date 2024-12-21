const express=require("express")
const mongoose=require("mongoose")
const post=require("./routes/api/posts")
const profile=require("./routes/api/profile")
const user=require("./routes/api/users")

const app=express();
//database configuration
const database=require("./config/keys").mongoURI;
//connect to databse
mongoose.connect(database)
.then(()=>{
    console.log("connected to database");
})
.catch((err)=>{
    console.log("Not connected to database",err);
})
app.get("/",(req,res)=>{
    res.send("hellooo!")
})

app.use("/api/users",user)
app.use("/api/profile",profile)
app.use("/api/post",post)

app.listen(3030,()=>{
    console.log("running");
    
})