import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import SideNav from "./_components/SideNav";
import "react-day-picker/style.css";

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { template: "%s | Utell", default: "Welcome | Utell" },
  description: "Room booking made easy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} font-sans antialiased`}>
        <main className="min-h-screen grid grid-cols-[80px_80px_1fr_80px] bg-background-secondary text-utell-text-dgray">
          <SideNav />

          <div className="col-start-3 col-end-4 mt-8">{children}</div>
        </main>
      </body>
    </html>
  );
}
