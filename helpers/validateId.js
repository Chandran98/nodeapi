const mongoose = require('mongoose');


module.exports.validateMongoDbId= (id)=>{
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if(!isValid) throw new Error ("Invalid Id or not Found")
}