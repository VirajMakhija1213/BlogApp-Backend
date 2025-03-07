const express=require("express");
const app=express();
require("dotenv").config();
const PORT=process.env.PORT || 3000;
//MiddleWare 
app.use(express.json());

const blog=require("./routes/blog");
app.use("/api/v1",blog);

const connectWithDb=require("./config/database");
connectWithDb();

app.listen(PORT,()=>{
    console.log(`Connection Started at Port ${PORT}`);
})

app.get("/",(req,res)=>{
    res.send("<h1>Hey Folks! Connection Established</h1>")
})