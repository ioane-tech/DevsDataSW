import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/app/styles/globals.css";


export const metadata: Metadata = {
  title: "DevsData: StarWars",
  description: "DevsData home work",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/icons/darthVaderIcon.png" /> 
      </head>
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
