import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const cors = { "Access-Control-Allow-Origin": "*" };

export async function POST(req: NextRequest) {
  try {
    const { key } = await req.json();

    if (!key || typeof key !== "string") {
      return NextResponse.json({ error: "Missing access key" }, { status: 400, headers: cors });
    }

    const accessKey = await prisma.accessKey.findUnique({
      where: { key },
      include: { user: { include: { membership: true } } },
    });

    if (!accessKey) {
      return NextResponse.json({ error: "Invalid access key" }, { status: 404, headers: cors });
    }

    if (accessKey.isConsumed) {
      return NextResponse.json({ error: "Access key already used" }, { status: 410, headers: cors });
    }

    const membership = accessKey.user.membership;
    if (!membership || membership.status !== "active") {
      return NextResponse.json({ error: "Membership is not active" }, { status: 403, headers: cors });
    }

    await prisma.accessKey.update({
      where: { key },
      data: { isConsumed: true, consumedAt: new Date() },
    });

    return NextResponse.json({
      success: true,
      userId: accessKey.userId,
      email: accessKey.user.email,
    }, { headers: cors });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500, headers: cors });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
