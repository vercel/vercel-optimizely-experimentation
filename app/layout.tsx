import type { Metadata } from "next";
import { Cabin } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { VercelToolbar } from "@vercel/toolbar/next";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/ui/sonner";

const cabin = Cabin({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cabin",
});

export const metadata: Metadata = {
  title: "Acme Store",
  description: "Example Next.js site with Optimizely experimentation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cabin.variable} max-w-7xl mx-auto`}>
        <Header />
        {children}
        {/*
          ⚠️ This shows the toolbar to all visitors
          See detailed instructions to limit who can see the toolbar for real applications:
          https://vercel.com/docs/workflow-collaboration/vercel-toolbar/in-production-and-localhost/add-to-production
        */}
        <VercelToolbar />
        <Analytics />
        <Toaster richColors />
      </body>
    </html>
  );
}
