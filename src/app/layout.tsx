import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

export const metadata: Metadata = {
  title: "Valoriya Service - Premium Roblox Ranking Platform",
  description: "The best automated ranking service for Roblox groups. Manage rankings, exile users, and automate your Discord server with our premium dashboard.",
  keywords: "roblox, ranking, service, discord, bot, automation, groups",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
