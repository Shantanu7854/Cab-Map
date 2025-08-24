// layout.tsx (Server Component)
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import AnimatedBackground from "../components/AnimatedBackground";

export const metadata = {
  title: "CabMap",
  description: "Resolve addresses and book cabs easily",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen relative overflow-x-hidden">
        <AnimatedBackground />
        
        {/* Content overlay */}
        <div className="relative z-10">
          <Navbar />
          <main className="pt-6">{children}</main>
          <Toaster position="top-right" />
        </div>
      </body>
    </html>
  );
}

// components/AnimatedBackground.tsx (Client Component)
