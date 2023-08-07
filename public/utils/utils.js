const moment = require('moment');


 function dataText(username,text){

    return{
        username,
        text,
        time:moment().format("h:mm a")
    }
    
}
module.exports = dataText;