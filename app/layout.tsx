import type { Metadata, Viewport } from "next";
import { Syne, JetBrains_Mono } from "next/font/google";
// app/layout.tsx
import Providers from "./providers";
import "./globals.css";
import "./styles/responsive.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "VoltIQ — EV Range Planner",
  description: "Intelligent EV range planning with real-time battery predictions",
};

// Ensures mobile browsers render at true device width instead of a
// desktop-simulated viewport, and lets the app safely use 100dvh.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#060c0a",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}