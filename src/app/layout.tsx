import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const nanumSquare = localFont({
  src: [
    {
      path: "../fonts/NanumSquareR.ttf",
      weight: "400",
    },
    {
      path: "../fonts/NanumSquareB.ttf",
      weight: "700",
    },
    {
      path: "../fonts/NanumSquareEB.ttf",
      weight: "800",
    },
  ],
  variable: "--font-nanum",
});

export const metadata: Metadata = {
  title: "Todo List",
  description: "할 일 관리 애플리케이션",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={nanumSquare.variable}>{children}</body>
    </html>
  );
}
