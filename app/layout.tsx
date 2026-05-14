import type { Metadata } from "next";
import { Roboto, Inter } from "next/font/google";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import SideNav from "./_components/SideNav";
import TopNav from "./_components/TopNav";
import ThemeProvider from "./_components/ThemeProvider";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

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
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("font-sans", inter.variable)}
    >
      <body className={`${roboto.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <main className="bg-bg text-text grid min-h-screen grid-cols-[1fr] grid-rows-[64px_1fr_64px] md:grid-cols-[80px_1fr] md:grid-rows-[1fr]">
            <TopNav />

            <SideNav />

            <div className="col-start-1 row-start-2 overflow-y-auto px-5 md:col-start-2 md:row-start-1 md:px-15">
              {children}
            </div>
          </main>
          <Toaster position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
