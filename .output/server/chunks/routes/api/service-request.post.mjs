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

const serviceRequest_post = defineEventHandler(async (event) => {
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
      from: `"${body.name || "Unknown Sender"}" <dafeenaconsultancyy@gmail.com>`,
      to: "dafeenaconsultancyy@gmail.com",
      subject: `Service Request: ${body.service} by ${body.name}`,
      text: `Dear Dafeena Consultancy Team,

    You have received a new service request with the following details:

    - Name: ${body.name || "Not provided"}
    - Email: ${body.email || "Not provided"}
    - Phone Number: ${body.phone_number || "Not provided"}
    - Requested Date: ${body.date || "Not provided"}
    - Service: ${body.service || "Not specified"}

    Description of the Request:
    ${body.description || "No additional details provided."}

    Kind regards,
    ${body.name || "A potential client"}`,
      replyTo: body.email || "no-reply@dafeenaconsultancyy.com"
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

export { serviceRequest_post as default };
//# sourceMappingURL=service-request.post.mjs.map
