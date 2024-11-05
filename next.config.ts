import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Config options here
};

const withVercelToolbar = require("@vercel/toolbar/plugins/next")();
// Instead of module.exports = nextConfig, do this:
module.exports = withVercelToolbar(nextConfig);
