import express, { Request, Response } from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/api/contact', async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, email, serviceOfInterest, budget, message } = req.body;

    // Basic validation
    if (!name || !email || !serviceOfInterest) {
      return res.status(400).json({ success: false, message: "Please tell us your name, email, and what you need help with!" });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "Please enter a valid email address." });
    }

    let transporter;

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS, 
        },
      });
    } else {
      console.warn("EMAIL_USER or EMAIL_PASS environment variables are not set. Using Ethereal Email for testing.");
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, 
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
    }

    const mailOptions = {
      from: process.env.EMAIL_USER || '"Test Sender" <test@example.com>',
      to: 'princemaurya7187@gmail.com', // The email address to receive the contact form submissions
      subject: `New Lead: ${name} - ${serviceOfInterest}`,
      text: `
--- New Lead Captured ---
Name: ${name}
Email: ${email}
Service: ${serviceOfInterest}
Budget: ${budget || 'Not specified'}
Message: ${message}
-------------------------
      `,
      html: `
        <h3>New Lead Captured</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Service:</strong> ${serviceOfInterest}</p>
        <p><strong>Budget:</strong> ${budget || 'Not specified'}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      console.log("Email sent successfully to princemaurya7187@gmail.com");
    } else {
      console.log("Test email sent! You can view it here:");
      console.log(nodemailer.getTestMessageUrl(info));
    }

    return res.status(200).json({ 
      success: true, 
      message: `Thanks for reaching out, ${name}! We're reviewing your request for ${serviceOfInterest} and will email you shortly.` 
    });

  } catch (error) {
    console.error("Error capturing lead:", error);
    return res.status(500).json({ success: false, message: "Something went wrong on our end. Please try again later." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
