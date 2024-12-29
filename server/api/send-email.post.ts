import nodemailer from "nodemailer";

export default defineEventHandler(async (event) => {
  const body = await readBody(event); // Get the form data from the request

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "dafeenaconsultancyy@gmail.com",
        pass: "tynw yeyp gdub jiel", // Replace with your actual app password
      },
    });

    const mailOptions = {
      from: body.email,
      to: "dafeenaconsultancyy@gmail.com",
      subject: `New Message from ${body.name}`,
      text: `Name: ${body.name}\nEmail: ${body.email}\nMessage: ${body.message}`,
    };

    await transporter.sendMail(mailOptions);

    return { success: true, message: "Email sent successfully!" };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      message: error
    }
  }
});
