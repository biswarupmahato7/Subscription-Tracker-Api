import transporter from "../config/nodemailer.js";


const mailOptions = {
  from: "biswarupmahato731@gmail.com",
  to: "biswarupmahato2000@gmail.com", // Replace with your email
  subject: "Test Email",
  text: "Hello! This is a test email from Nodemailer.",
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error("❌ Test email failed:", error);
  } else {
    console.log("✅ Test email sent:", info.response);
  }
});
