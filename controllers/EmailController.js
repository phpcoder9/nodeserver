const mail = require("../config/mailer");
const DefaultEmailTemplate = require("../email_templates/default_template");

const EmailController = {
    sendMail:(req,res)=>{
        const template = DefaultEmailTemplate();
        const mailOptions = {
            from: "sk.shubhamg007@gmail.com",
            to: "sk.shubhamg007@gmail.com",
            subject: "Hello from NodeMailer",
            html: template,
        };
        mail.sendMail(mailOptions, (error, info) => {
            if (error) {
              res.send("Mail Sending failed!");
            } else {
              res.send("Mail Send Successfull!");
            }
        });
    }
};
  
module.exports = EmailController;