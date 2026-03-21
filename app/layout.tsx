import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "../components/SiteHeader";
import SessionProviderWrapper from "../components/SessionProviderWrapper";

export const metadata: Metadata = {
  title: "Commons Atrium",
  description: "Calm entry point and control center for the ecosystem.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-black">
        <SessionProviderWrapper>
          <SiteHeader />
          {children}
        </SessionProviderWrapper>
      </body>
    </html>
  );
}