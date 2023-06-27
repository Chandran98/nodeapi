const asyncHanlder = require("express-async-handler");
const proudctmodel = require("..//models/productmodel");

const getProducts= asyncHanlder(
    (req,res)=>{
        res.status(200).json({message:"new products"});
    }
);

const createProduct=asyncHanlder(async(req,res)=>{
    console.log(req.body);

    const {name,price,qty} =req.body;
    if(!name||!price||!qty){
        res.status(400);

        throw new Error ("All fields are mandatory");
    }

    const product =await proudctmodel.create({
        name,price,qty,

    });

    res.status(200).json(product);



})

const getProductsByid = asyncHanlder((req,res)=>{
    res.status(200).json({message:`product id ${req.params.id}`})
})


module.exports={getProducts,getProductsByid,createProduct}