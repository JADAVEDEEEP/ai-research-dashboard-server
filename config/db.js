const mongoose = require("mongoose");


const connectdb = async()=>{
    try{
        mongoose.connect(process.env.MONGO_URI)
        console.log("Database connected successfully");
    }catch(err){
        console.log("Error in connecting to database",err);
    }
}

module.exports = connectdb;