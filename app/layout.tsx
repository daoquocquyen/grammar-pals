import type { Metadata } from "next";
import "./globals.css";
import { AudioProvider } from "./components/audio/AudioProvider";

export const metadata: Metadata = {
  title: "GrammarPals",
  description: "Kid-safe grammar rescue missions.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AudioProvider>
          <div className="app-shell">{children}</div>
        </AudioProvider>
      </body>
    </html>
  );
}
