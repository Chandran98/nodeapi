const mongoose= require("mongoose");
const connectDb=async ()=>{
    try {
       const connect= await mongoose.connect(process.env.CONNECT_DB);
       console.log(connect.connection.host,connect.connection.name);
       console.log(111);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports=connectDb;
