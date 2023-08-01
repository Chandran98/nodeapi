const mongoose = require ("mongoose");


const productModel =mongoose.Schema(
    {
        creatorId:{
            type :mongoose.Schema.Types.ObjectId,
            
            ref:"Users"
        },
        
        name:{
            type :String,
            required:true,
            
        },price:{
            type :String,
            required:true,
        },qty:{
            type :String,
            required:true,
        }

    },{
        timestamps:true
    }
);

module.exports =mongoose.model("products",productModel);