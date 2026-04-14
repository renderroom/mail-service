// import { transporter } from "@/functions/transporter/transporter";
// import { NextRequest, NextResponse } from "next/server";

// export const POST = async (request: NextRequest) => {
//   try {
//     const formData = await request.formData();
//     console.log(formData);
//     const email = formData.get("email") as string;
//     const subject = formData.get("subject") as string;
//     const text = formData.get("text") as string | null;
//     const html = formData.get("html") as string | null;

//     if (!email || !subject) {
//       return NextResponse.json(
//         { error: "Missing required fields: email, subject" },
//         { status: 400 }
//       );
//     }

//     const files = formData.getAll("attachments") as File[];
//     files.forEach(async (file) => {
//       const buffer = Buffer.from(await file.arrayBuffer());
//       const filename = file.name.replaceAll(" ", "_");
//       const filetype = file.type;
//       console.log(filename);
//       console.log(buffer);
//       console.log(filetype);
//     });

//     const attachments = await Promise.all(
//       files.map(async (file) => {
//         const buffer = Buffer.from(await file.arrayBuffer());
//         return {
//           filename: file.name,
//           content: buffer,
//           contentType: file.type,
//         };
//       })
//     );
//     console.log(files);
//     console.log(attachments);

//     const fromEmail = (transporter.options as any)?.auth?.user;

//     await transporter.sendMail({
//       from: `MANOJ MAIL SERVICE <${fromEmail}>`,
//       to: email,
//       subject,
//       text: text || undefined,
//       html: html || undefined,
//       attachments,
//     });

//     return NextResponse.json(
//       { message: "Email sent Successfully" },
//       { status: 200 }
//     );
//   } catch (error: any) {
//     console.error("Email error:", error);
//     return NextResponse.json(
//       {
//         error: "Failed to send email",
//         details: error.message || error.toString(),
//       },
//       { status: 500 }
//     );
//   }
// };


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
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const text = formData.get("text") as string | null;
    const html = formData.get("html") as string | null;

    if (!email || !subject) {
      const res = NextResponse.json(
        { error: "Missing required fields: email, subject" },
        { status: 400 }
      );
      res.headers.set("Access-Control-Allow-Origin", "*");
      return res;
    }

    const files = formData.getAll("attachments") as File[];

    const attachments = [];
    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());
      attachments.push({
        filename: file.name,
        content: buffer,
        contentType: file.type,
      });
    }

    const fromEmail = (transporter.options as any)?.auth?.user;

    await transporter.sendMail({
      from: `MANOJ MAIL SERVICE <${fromEmail}>`,
      to: email,
      subject,
      text: text || undefined,
      html: html || undefined,
      attachments,
    });

    const res = NextResponse.json(
      { message: "Email sent Successfully" },
      { status: 200 }
    );
    res.headers.set("Access-Control-Allow-Origin", "*");
    return res;
  } catch (error: any) {
    console.error("Email error:", error);
    const res = NextResponse.json(
      { error: "Failed to send email", details: error.message || String(error) },
      { status: 500 }
    );
    res.headers.set("Access-Control-Allow-Origin", "*");
    return res;
  }
};
