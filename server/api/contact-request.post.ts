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
      subject: `Inquiry from ${body.name} about ${body.topic}`,
      text: `Dear Dafeena Consultancy Team,

    ${body.name}, using the email address ${body.email}, has requested a callback to discuss "${body.topic}."

    Additional details provided:
    "${body.description}"

    Kind regards,
    ${body.name}`,
    };

    await transporter.sendMail(mailOptions);

    return { success: true, message: "Email sent successfully!" };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      message: error,
    };
  }
});
