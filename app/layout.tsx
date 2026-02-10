import type { Metadata } from "next";
import Providers from "./providers";
import "./globals.css";
import LayoutClient from "./components/layout/LayoutClient";

export const metadata: Metadata = {
  title: "D.home",
  description: "D.home 입니다!",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased no-scrollbar overflow-x-hidden">
        <Providers>
          <LayoutClient>{children}</LayoutClient>
        </Providers>
      </body>
    </html>
  );
}
