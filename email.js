/*
send E-mail using nodejs

install below below 

  npm i nodemailder

  Note: If you're using the GMAIL Service you need to generate an app password

*/

const nodemailer = require("nodemailer");

const smtpTransport = nodemailer.createTransport({
  host: "EMAIL HOST",
  port: 465,
  secure: true,
  auth: {
    user: "USERNAME",
    pass: "PASSWORD",
  },
});

const mailOptions = {
  from: "FROM EMAIL",
  to: "TO EMAIL",
  subject: "SUBJECT",
  text: "EMAIL BODY",
};

smtpTransport.sendMail(mailOptions, (error, response) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent:", response.messageId);
  }
  smtpTransport.close();
});
