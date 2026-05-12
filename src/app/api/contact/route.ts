import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib/session";
import type { SessionData } from "@/lib/session";

const MAX_SUBMISSIONS = 3;

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const session = await getIronSession<SessionData>(cookieStore, sessionOptions);

  const count = session.contactSubmissions ?? 0;
  if (count >= MAX_SUBMISSIONS) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again later." },
      { status: 429 }
    );
  }

  const body = await req.json();
  const { name, email, message, subject } = body as {
    name?: string;
    email?: string;
    message?: string;
    subject?: string;
  };

  if (!name || !email || !message) {
    return NextResponse.json({ error: "name, email, message required" }, { status: 400 });
  }

  const payload = {
    from: "portfolio@vikashksingh.dev",
    to: process.env.CONTACT_EMAIL ?? "vikashksingh1308@gmail.com",
    subject: subject ?? `Portfolio contact from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  };

  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from: payload.from,
        to: payload.to,
        subject: payload.subject,
        text: payload.text,
      });
    } catch (err) {
      console.error("Resend error:", err);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }
  } else {
    console.log("[contact] RESEND_API_KEY not set — payload:", payload);
  }

  session.contactSubmissions = count + 1;
  await session.save();

  return NextResponse.json({ ok: true });
}
