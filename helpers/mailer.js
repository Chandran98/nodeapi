const nodemailer = require("nodemailer");



const sendmail = async( sub,message,send_to,send_from,reply_to)=>{

    // const transporter = nodemailer.createTransport({
    //     host:process.env.EMAIL_HOST,port:"587",
    //     auth:{
    //         user:process.env.EMAIL_USER,
    //         pass:process.env.EMAIL_PASS,
    //     }
    //     ,tls:{

    //         rejectUnauthorized:false,
    //     }

    // })
    
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:"chandran18@gmail.com",
            pass:"161198@Jc",
        }
        ,tls:{

            rejectUnauthorized:false,
        }

    })

    // const opts={
    //     from:send_from,     
    //     to:send_to,
    //     replyTo:reply_to,
    //     subject:subject,
    //     html:message
    // }

    
    const opts={
        from:"chandranjc18@gmail.com",     
        to:"chandranjc16@gmail.com",
        // replyTo:reply_to,
        subject:"subject",
        // html:message
        text:"email"
    }

    transporter.sendMail(opts,(err,data)=>{
        if (err) {
            console.log(err)
            
        }else{
            console.log(err)
            
        }
    })
} 

const mailController =async( req,res)=>{
const {email } =req.body;
    try {
const send_to="chandran16@gmail.com";
// const reply_to=;
const send_from=process.env.EMAIL_USER;
const subject="Testing mail node";
const message ="Test"
       await sendmail(send_from,     
        send_to,
        // reply_to,
        subject,
        message)
        res.status(200).json({succes :true,message :"email sent"})
        
    } catch (error) {
        console.log(error)
        
        res.status(404).json({message :"error sent"})
        
    }
}

module.exports = {sendmail,mailController};

