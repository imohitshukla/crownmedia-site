import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, serviceOfInterest, budget, message } = body;

    // Basic validation
    if (!name || !email || !serviceOfInterest) {
      return NextResponse.json(
        { success: false, message: "Please tell us your name, email, and what you need help with!" },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // TODO: Save to Database (e.g., MongoDB / PostgreSQL)
    console.log("--- New Lead Captured ---");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Service:", serviceOfInterest);
    console.log("Budget:", budget);
    console.log("Message:", message);
    console.log("-------------------------");

    // TODO: Trigger internal notification (e.g., via webhook or email)
    
    // Respond with a "human" success message
    return NextResponse.json(
      { 
        success: true, 
        message: `Thanks for reaching out, ${name}! We're reviewing your request for ${serviceOfInterest} and will email you shortly.` 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error capturing lead:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong on our end. Please try again later." },
      { status: 500 }
    );
  }
}
