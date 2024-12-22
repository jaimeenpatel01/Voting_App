require("dotenv").config();
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    secure: true,
    host: "smtp.gmail.com", 
    port: 465,
    auth: {
      user: "coolg3559@gmail.com",
      pass: "axwrfcsyqkqvwofj",
    },
  });
  

const sendConfirmationEmail = async (userEmail, userName) => {
  const mailOptions = {
    from: '"Election Team" <coolg3559@gmail.com>',
    to: userEmail,
    subject: "Vote Confirmation",
    text: `Hello ${userName},\n\nYour vote has been successfully casted. Thank you for participating in the election.\n\nBest regards,\nElection Team`,
    html: `<p>Hello ${userName},</p><p>Your vote has been successfully casted. Thank you for participating in the election.</p><p>Best regards,<br>Election Team</p>`,
  };

  try {

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendConfirmationEmail;
