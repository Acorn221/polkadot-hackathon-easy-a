import type { Metadata, Viewport } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import { cn } from "@linked-out/ui";
import { ThemeProvider, ThemeToggle } from "@linked-out/ui/theme";
import { Toaster } from "@linked-out/ui/toast";

import { TRPCReactProvider } from "~/trpc/react";

import "~/app/globals.css";

import { env } from "~/env";
import { MsClarity } from "./_components/ms-clarity";

export const metadata: Metadata = {
  metadataBase: new URL(
    env.VERCEL_ENV === "production"
      ? "https://linkedout.lol"
      : "http://localhost:3000",
  ),
  title: "LinkedOut",
  description: "Dislikes for LinkedIn",
  openGraph: {
    title: "LinkedOut",
    description: "Dislikes for LinkedIn",
    url: "https://linkedout.lol/",
    siteName: "LinkedOut",
    images: [
      {
        url: "https://linkedout.lol/marquee.png",
        type: "image/png",
      },
    ],
  },
  publisher: "J4A Industries",
  assets: ["https://linkedout.lol/marquee.png"],
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans text-foreground antialiased",
          GeistSans.variable,
          GeistMono.variable,
        )}
      >
        <MsClarity />
        <GoogleTagManager gtmId={env.NEXT_PUBLIC_GTAG_MEASUREMENT_ID} />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TRPCReactProvider>{props.children}</TRPCReactProvider>
          <div className="fixed bottom-8 right-8 overflow-hidden">
            <ThemeToggle />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
