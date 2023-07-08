const nodemailer = require("nodemailer");

const sendmail = async (sub, message, send_to, send_from, reply_to) => {
  const transporter = nodemailer.createTransport({
    host: "mail.smtp2go.com",
    port: 465,
    secure: true,
    secureConnection: false,
    auth: {
      user: "chandran@kairaa.in",
      pass: "jayathi98",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const opts = {
    from: send_from,
    to: "chandran16@gmail.com",
    replyTo: reply_to,
    subject: sub,
    html: message,
  };

  transporter.sendMail(opts, (err, data) => {
    if (err) {
      console.log(213123);
      console.log(err);
    } else {
      console.log(data);
    }
  });
};

const mailController = async (req, res) => {
  const { email } = req.body;
  try {
    const send_to = "chandran16@gmail.com";
    // const reply_to=;
    const send_from = "chandran@kairaa.in";
    const subject = "Testing mail node";
    const message = "Test";
    await sendmail(
      send_from,
      send_to,
      // reply_to,
      subject,
      message
    );
    res.status(200).json({ succes: true, message: "email sent" });
  } catch (error) {
    console.log(error);

    res.status(404).json({ message: "error sent" });
  }
};

module.exports = { sendmail, mailController };
