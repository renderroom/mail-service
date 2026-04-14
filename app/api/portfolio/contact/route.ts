import { transporter } from "@/functions/transporter/transporter";
import { NextRequest, NextResponse } from "next/server";

export const OPTIONS = async () => {
  const res = new NextResponse(null, { status: 204 });
  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return res;
};

export const POST = async (request: NextRequest) => {
  try {
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    if (!name || !email || !message) {
      const res = NextResponse.json(
        { error: "Missing required fields: name, email, message" },
        { status: 400 }
      );
      res.headers.set("Access-Control-Allow-Origin", "*");
      return res;
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

    const res = NextResponse.json(
      { message: "Email sent Successfully", success : true, status : 200 }
    );
    res.headers.set("Access-Control-Allow-Origin", "*");
    return res;
  } catch (error: unknown) {
    console.error("Email error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    const res = NextResponse.json(
      { error: "Failed to send email", details: errorMessage },
      { status: 500 }
    );
    res.headers.set("Access-Control-Allow-Origin", "*");
    return res;
  }
};