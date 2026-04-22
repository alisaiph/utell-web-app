import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import SideNav from "./_components/SideNav";
import "react-day-picker/style.css";
import ThemeProvider from "./_components/ThemeProvider";

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
    <html lang="en" suppressHydrationWarning>
      <body className={`${roboto.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <main className="min-h-screen grid grid-cols-[80px_80px_1fr_80px] bg-bg text-text">
            <SideNav />

            <div className="col-start-3 col-end-4 my-15">{children}</div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
