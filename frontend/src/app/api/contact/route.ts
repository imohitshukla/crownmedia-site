import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, serviceOfInterest, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Please tell us your name, email, and what you need help with!" },
        { status: 400 }
      );
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("Missing EMAIL_USER or EMAIL_PASS environment variables.");
      return NextResponse.json(
        { success: false, message: "Server configuration error. Please contact the administrator." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'princemaurya7187@gmail.com', // Receive at this address
      subject: `New Lead: ${name} - ${serviceOfInterest}`,
      text: `
--- New Lead Captured ---
Name: ${name}
Email: ${email}
Service: ${serviceOfInterest}
Message: ${message}
-------------------------
      `,
      html: `
        <h3>New Lead Captured</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Service:</strong> ${serviceOfInterest}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully to princemaurya7187@gmail.com");

    return NextResponse.json(
      { success: true, message: `Thanks for reaching out, ${name}! We're reviewing your request and will email you shortly.` },
      { status: 200 }
    );

  } catch (error: any) {
    console.error("Error capturing lead:", error);
    return NextResponse.json(
      { success: false, message: "Server Error: " + (error.message || error.toString()) },
      { status: 500 }
    );
  }
}
