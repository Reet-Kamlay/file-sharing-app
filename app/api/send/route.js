import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const body = await req.json();
  const { to, fileName, fileId } = body;

  const fileUrl = `https://file-sharing-app-henna-pi.vercel.app/f/${fileId}`; // 👈 updated link format

  try {
    const data = await resend.emails.send({
      from: "FileShare App <onboarding@resend.dev>",
      to,
      subject: "📁 You've Got a File!",
      html: `
        <div style="background-color: #f8fafc; padding: 40px 0; font-family: 'Segoe UI', Tahoma, sans-serif;">
          <table style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 8px 20px rgba(0,0,0,0.05); padding: 40px;">
            <tr>
              <td style="text-align: center;">
                <img src="https://cdn-icons-png.flaticon.com/512/561/561127.png" width="60" style="margin-bottom: 20px;" alt="File Share Icon" />
                <h1 style="font-size: 24px; color: #1f2937; margin-bottom: 12px;">You've Got a File! 📦</h1>
                <p style="font-size: 16px; color: #4b5563; margin: 0 0 24px;">
                  <strong>${fileName}</strong> has been shared with you via <b>FileShare</b>.
                </p>
                <a href="${fileUrl}" style="
                  display: inline-block;
                  background: linear-gradient(to right, #6366f1, #8b5cf6);
                  color: white;
                  text-decoration: none;
                  font-size: 16px;
                  font-weight: 600;
                  padding: 14px 28px;
                  border-radius: 8px;
                  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
                  margin-bottom: 32px;
                ">
                  ⬇️ Download File
                </a>
                <p style="font-size: 14px; color: #6b7280;">
                  File name: <strong>${fileName}</strong><br/>
                  File link: <a href="${fileUrl}" style="color: #6366f1; text-decoration: underline;">${fileUrl}</a>
                </p>
                <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 32px 0;" />
                <p style="font-size: 12px; color: #9ca3af;">
                  This email was sent from <strong>FileShare App</strong>.<br/>
                  If you weren’t expecting this file, you can ignore or delete this message.
                </p>
              </td>
            </tr>
          </table>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Resend Error:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
