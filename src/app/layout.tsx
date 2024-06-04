import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import React from "react";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "chi non mi ricambia su instagram?",
  description: "by berto",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
    <head>
        <link rel={"manifest"} href={"/manifest.json"}/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="white"/>
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#121113"/>
        <link rel="apple-touch-icon" href="/apple-touch-icon.png"/>
    </head>
    <body className={inter.className}>
    <ThemeProvider attribute="class">
        <Theme appearance={"inherit"} accentColor={"red"}>
        {children}
        </Theme>
    </ThemeProvider>
      </body>
    </html>
  );
}
