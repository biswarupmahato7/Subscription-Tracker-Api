import nodemailer from "nodemailer";
import {  EMAIL_PASSWORD } from "./env.js";

export const accountEmail = "biswarupmahato731@gmail.com";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465, // Use 465 for SSL or 587 for TLS
  secure: true, // True for port 465, false for 587
  auth: { 
    user: accountEmail,
    pass: EMAIL_PASSWORD,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("❌ SMTP Connection Error:", error);
  } else {
    console.log("✅ SMTP Server is ready to send emails",success);
  }
});

export default transporter;
