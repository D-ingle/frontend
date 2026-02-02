import type { Metadata } from "next";
import Providers from "./providers";
import "./globals.css";
import Navbar from "./components/layout/Navbar";

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
      <body className="antialiased no-scrollbar">
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
