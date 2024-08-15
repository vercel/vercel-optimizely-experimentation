import { NextResponse } from "next/server";

export async function POST(req, res) {
  const body = await req.json();
  console.log({ body });
  // push body into edge config for lookup later
  return NextResponse.json({ success: true }, { status: 200 });
}
