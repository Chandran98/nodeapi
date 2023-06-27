const mongoose = require ("mongoose");


const productModel =mongoose.Schema(
    {
        // produId:{
        //     type :mongoose.Schema.Types.ObjectId,
        //     required:true,
        //     ref:"Product"
        // },
        
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