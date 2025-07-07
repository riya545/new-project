var nodemailer = require('nodemailer');

module.exports = function(email, message) {
  var user = process.env.EMAIL;
  var pass = process.env.PASSWORD;

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: user,
      pass: pass
    }
  });

  var mailOptions = {
    from: user,
    to: email,
    subject: 'Link to reset your password',
    text: message
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};
