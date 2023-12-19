const nodemailer = require('nodemailer');

const sendMail = function(email, subject, message) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: false,
      auth: {
        user: 'vishalvananiviitorcloud@gmail.com',
        pass: 'lucltampnkjhsces'
      }
    });
  
    var mailOptions = {
      from: 'vishalvananiviitorcloud',
      to: email,
      subject: subject,
      text: message,
      html: message,
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log('error: ', error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }

  const makeId = function(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  module.exports = {
    sendMail:sendMail,
    makeId:makeId
}
