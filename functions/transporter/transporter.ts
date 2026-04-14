import nodemailer from "nodemailer";

const config = process.env.SMTP_URL;

if (!config) {
  console.warn("SMTP_URL is not defined in environment variables");
}

export const transporter = nodemailer.createTransport(config || "");