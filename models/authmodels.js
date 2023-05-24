const mongoose = require("mongoose");

const authschema= mongoose.Schema({

    username:{
        type: String,
        required:[true,"Please Add your name"],
            },
    email:{
        type:String,
        required:[true,"Please add your email ID"],
        unique:[true,"Already Registered "]
    },
    password:{
        type:String,
        required:[true,"Please add your password"]
    }
},{
    timestamps:true
})

module.exports= mongoose.model("Auth",authschema);