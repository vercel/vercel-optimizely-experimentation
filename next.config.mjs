/** @type {import('next').NextConfig} */
const nextConfig = {};

import withVercelToolbar from "@vercel/toolbar/plugins/next";
export default withVercelToolbar()(nextConfig);
