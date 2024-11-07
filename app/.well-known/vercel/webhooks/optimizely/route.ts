import { NextResponse } from "next/server";
import crypto from "crypto";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    // Read the request body once
    const body = await req.json();

    // Verify the webhook request came from Optimizely
    const isVerified = await verifyOptimizelyWebhook(req.headers, body);

    if (!isVerified) {
      return NextResponse.json(
        { success: false, message: "Invalid webhook request" },
        { status: 401 }
      );
    }

    // Validate the request body
    const { data, success, error } =
      optimizelyWebhookBodySchema.safeParse(body);

    if (!success) {
      const errorMessages = error.issues.map(
        (issue) => `${issue.path.join(".")}: ${issue.message}`
      );
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request body",
          errors: errorMessages,
        },
        { status: 400 }
      );
    }

    const { environment, origin_url } = data.data;

    if (environment !== "Production") {
      return NextResponse.json(
        { success: true, message: "Pre-production environment event" },
        { status: 200 }
      );
    }

    const response = await fetch(origin_url);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch JSON from Optimizely CDN: ${response.statusText}`
      );
    }

    const datafile = await response.json();

    await updateEdgeConfig(datafile);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

async function verifyOptimizelyWebhook(
  headers: Headers,
  body: string
): Promise<boolean> {
  try {
    const WEBHOOK_SECRET = process.env.OPTIMIZELY_WEBHOOK_SECRET;
    if (!WEBHOOK_SECRET) {
      throw new Error("Missing OPTIMIZELY_WEBHOOK_SECRET");
    }

    const signature = headers.get("X-Hub-Signature");
    if (!signature) {
      throw new Error("Missing X-Hub-Signature header");
    }

    const [algorithm, hash] = signature.split("=");
    if (algorithm !== "sha1" || !hash) {
      throw new Error("Invalid signature format");
    }

    const hmac = crypto.createHmac("sha1", WEBHOOK_SECRET);
    const digest = hmac.update(body).digest("hex");

    return crypto.timingSafeEqual(
      Buffer.from(hash, "hex"),
      Buffer.from(digest, "hex")
    );
  } catch (error) {
    console.error("Error verifying webhook:", error.message);
    return false;
  }
}

async function updateEdgeConfig(datafile: any) {
  const { VERCEL_EDGE_CONFIG_ID, VERCEL_TEAM_ID, VERCEL_API_TOKEN } =
    process.env;

  if (!VERCEL_EDGE_CONFIG_ID || !VERCEL_TEAM_ID || !VERCEL_API_TOKEN) {
    throw new Error(
      "Missing required environment variables for Edge Config update"
    );
  }

  const edgeConfigEndpoint = `https://api.vercel.com/v1/edge-config/${VERCEL_EDGE_CONFIG_ID}/items?teamId=${VERCEL_TEAM_ID}`;

  const response = await fetch(edgeConfigEndpoint, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${VERCEL_API_TOKEN}`,
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

  if (!response.ok) {
    throw new Error(`Failed to update Edge Config: ${response.statusText}`);
  }

  return response;
}

const optimizelyWebhookBodySchema = z.object({
  project_id: z.number(),
  timestamp: z.number(),
  event: z.literal("project.datafile_updated"),
  data: z.object({
    revision: z.number(),
    origin_url: z.string().url(),
    cdn_url: z.string().url(),
    environment: z.string(),
  }),
});
