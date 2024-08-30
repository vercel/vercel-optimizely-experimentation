import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const signature = req.headers.get("X-Hub-Signature");

    if (!signature) {
      throw new Error("Missing X-Hub-Signature header");
    }

    if (signature !== process.env.OPTIMIZELY_WEBHOOK_SECRET) {
      throw new Error("Invalid X-Hub-Signature header");
    }

    const body = await req.json();

    if (!body?.data?.origin_url) {
      throw new Error("Missing datafile origin_url");
    }

    const response = await fetch(body.data.origin_url);

    if (!response.ok) {
      throw new Error(`Failed to fetch JSON Optimizely CDN`);
    }

    const datafile = await response.json();

    await updateEdgeConfig(datafile);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}

async function updateEdgeConfig(datafile: any) {
  if (!process.env.VERCEL_EDGE_CONFIG_ID) {
    throw new Error("Missing VERCEL_EDGE_CONFIG_ID");
  }

  if (!process.env.VERCEL_TEAM_ID) {
    throw new Error("Missing VERCEL_TEAM_ID");
  }

  if (!process.env.VERCEL_API_TOKEN) {
    throw new Error("Missing VERCEL_API_TOKEN");
  }

  const edgeConfigEndpoint = `https://api.vercel.com/v1/edge-config/${process.env.VERCEL_EDGE_CONFIG_ID}/items?teamId=${process.env.VERCEL_TEAM_ID}`;

  return await fetch(edgeConfigEndpoint, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${process.env.VERCEL_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      items: [
        {
          operation: "upsert",
          key: "datafile",
          value: datafile,
        },
      ],
    }),
  });
}
