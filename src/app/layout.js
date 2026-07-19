import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "DishDash — Premium Recipe App",
  description: "Search, save, add, and manage your favorite culinary recipes with ease.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-50 selection:bg-orange-500/30 selection:text-orange-200">
        <Navbar />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
      <Footer></Footer>
      <ChatWidget></ChatWidget>
      </body>
    </html>
  );
}

