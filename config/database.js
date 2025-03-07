const mongoose=require("mongoose");
require("dotenv").config();
const connectWithDb=()=>{
    mongoose.connect(process.env.DATABASE_URL)
    .then(()=>{
        console.log("Database Connection Successful");
    })
    .catch((error)=>{
        console.log("There is some error in Database Connection");
        console.error(error);
        process.exit(1);
    })
}
module.exports=connectWithDb;