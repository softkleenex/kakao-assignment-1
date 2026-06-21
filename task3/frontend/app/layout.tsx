import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Minimalist Tasks",
  description: "Next.js와 FastAPI로 만든 Todo 앱",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
