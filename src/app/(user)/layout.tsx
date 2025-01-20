import type { Metadata } from "next";
import "../../styles/globals.css";
import NavBar from "@/components/NavBar";
import PageButton from "@/components/PageButton";
import "slick-carousel/slick/slick.css"
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Shopping Store | Best Place to Shop",
  description: "Your trusted online shopping store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-display">
        <NavBar />
        <PageButton />
        {children}
        <Footer />
      </body>
    </html>
  );
}
