import type { Metadata } from "next";
import "./globals.css";

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
        <div className="app-shell">{children}</div>
      </body>
    </html>
  );
}
