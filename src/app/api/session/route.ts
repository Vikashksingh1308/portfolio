import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { v4 as uuidv4 } from "uuid";
import { sessionOptions } from "@/lib/session";
import type { SessionData } from "@/lib/session";

export async function GET() {
  const cookieStore = await cookies();
  const session = await getIronSession<SessionData>(cookieStore, sessionOptions);

  const isReturn = !!session.visitorId;
  if (!session.visitorId) {
    session.visitorId = uuidv4();
    session.firstVisit = true;
    session.viewedProjects = [];
    await session.save();
  }

  return NextResponse.json({
    visitorId: session.visitorId,
    isReturn,
    viewedProjects: session.viewedProjects ?? [],
  });
}

export async function POST(req: NextRequest) {
  const { slug } = await req.json();
  if (!slug || typeof slug !== "string") {
    return NextResponse.json({ error: "slug required" }, { status: 400 });
  }

  const cookieStore = await cookies();
  const session = await getIronSession<SessionData>(cookieStore, sessionOptions);

  if (!session.visitorId) {
    session.visitorId = uuidv4();
  }
  if (!session.viewedProjects) {
    session.viewedProjects = [];
  }
  if (!session.viewedProjects.includes(slug)) {
    session.viewedProjects.unshift(slug);
    // keep max 5
    session.viewedProjects = session.viewedProjects.slice(0, 5);
  }
  await session.save();

  return NextResponse.json({ ok: true });
}
