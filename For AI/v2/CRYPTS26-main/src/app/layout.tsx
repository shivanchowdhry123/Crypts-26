import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CRYPTS'26 | The Singularity Overload — OPG World School TechFest",
  description: "CRYPTS'26: The Singularity Overload. OPG World School's premier annual TechFest.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${jetbrainsMono.variable} h-full antialiased scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <Script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js" strategy="beforeInteractive" />
      </head>
      <body className="min-h-full flex flex-col relative text-white bg-[var(--dark-void)]" suppressHydrationWarning>
        {/* Ambient Background Blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute w-[400px] h-[400px] rounded-full blur-[80px] -top-[100px] -left-[100px] bg-[radial-gradient(circle,rgba(217,0,188,0.18)_0%,transparent_70%)] animate-[float_8s_ease-in-out_infinite]" />
          <div className="absolute w-[300px] h-[300px] rounded-full blur-[80px] top-[200px] -right-[80px] bg-[radial-gradient(circle,rgba(0,243,255,0.12)_0%,transparent_70%)] animate-[float_8s_ease-in-out_infinite] [animation-delay:-3s]" />
          <div className="absolute w-[250px] h-[250px] rounded-full blur-[80px] bottom-[100px] left-[30%] bg-[radial-gradient(circle,rgba(217,0,188,0.10)_0%,transparent_70%)] animate-[float_8s_ease-in-out_infinite] [animation-delay:-5s]" />
        </div>

        {/* Global Scanline Overlay */}
        <div className="scanline"></div>

        {/* Dynamic Content */}
        <div className="relative z-10 w-full flex-grow flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
