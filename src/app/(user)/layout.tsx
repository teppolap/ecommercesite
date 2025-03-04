import type { Metadata } from "next";
import "../../styles/globals.css";
import NavBar from "@/components/NavBar";
import PageButton from "@/components/PageButton";
import "slick-carousel/slick/slick.css"
import Footer from "@/components/Footer";
import Layout from "@/components/Layout";

export const metadata: Metadata = {
  title: "TopShelf Market",
  description: "Where Quality Meets Variety",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-display">
      <Layout>
        <NavBar />
          <PageButton />
          {children}
          <Footer />
      </Layout>
      </body>
    </html>
  );
}
