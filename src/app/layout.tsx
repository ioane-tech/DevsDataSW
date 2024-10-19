import type { Metadata } from "next";

//styles
import "@/app/styles/globals.css";
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from "react-toastify";
import { SearchProvider } from "./lib/context/searchContext";


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
        <SearchProvider>
          <ToastContainer/>
          {children}
        </SearchProvider>
      </body>
    </html>
  );
}
