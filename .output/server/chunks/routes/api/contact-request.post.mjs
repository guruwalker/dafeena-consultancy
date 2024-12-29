import { d as defineEventHandler, r as readBody } from '../../runtime.mjs';
import nodemailer from 'nodemailer';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'vue';
import 'consola/core';
import 'node:fs';
import 'node:url';
import '@iconify/utils';

const contactRequest_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "dafeenaconsultancyy@gmail.com",
        pass: "tynw yeyp gdub jiel"
        // Replace with your actual app password
      }
    });
    const mailOptions = {
      from: body.email,
      to: "dafeenaconsultancyy@gmail.com",
      subject: `Inquiry from ${body.name} about ${body.topic}`,
      text: `Dear Dafeena Consultancy Team,

    ${body.name}, using the email address ${body.email}, has requested a callback to discuss "${body.topic}."

    Additional details provided:
    "${body.description}"

    Kind regards,
    ${body.name}`
    };
    await transporter.sendMail(mailOptions);
    return { success: true, message: "Email sent successfully!" };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      message: error
    };
  }
});

export { contactRequest_post as default };
//# sourceMappingURL=contact-request.post.mjs.map
