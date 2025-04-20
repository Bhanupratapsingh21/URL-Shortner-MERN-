import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/store/Provider";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import AppWrapper from "@/utils/SessionWrapper";

export const metadata: Metadata = {
  title: "Linky",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  description: "A URL shortener and redirector",
  keywords: [
    "URL shortener",
    "link shortener",
    "link management",
    "URL redirector",
    "link tracking",
    "URL analytics",
  ]
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="dark" lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          <AppWrapper>
            {children}
            <Toaster />
          </AppWrapper>
        </ReduxProvider>
      </body>
    </html>
  );
}
