import { transporter } from "@/functions/transporter/transporter";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, message" },
        { status: 400 }
      );
    }

    const subject = "Message from business portfolio";
    const toEmail = "renderroom.hub@gmail.com";

    const mailBody = `
Name: ${name}
Email: ${email}

Message:
${message}
    `.trim();

    await transporter.sendMail({
      from: email,
      to: toEmail,
      subject,
      text: mailBody,
      replyTo: email,
    });

    return NextResponse.json(
      { message: "Email sent Successfully", success : true, status : 200 });
  } catch (error: unknown) {
    console.error("Email error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to send email", details: errorMessage },
      { status: 500 }
    );
  }
};