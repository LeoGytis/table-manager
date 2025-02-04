import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";

const font = Quicksand({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Table Manager",
  description: "Table Manager to manage the users data",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} mx-6`}>{children}</body>
    </html>
  );
}
