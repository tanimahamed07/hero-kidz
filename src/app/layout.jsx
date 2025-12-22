import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import Footer from "@/components/layouts/Footer";
import Navbar from "@/components/layouts/Navbar";

const poppins = Poppins({ weight: ["100", "200", "400", "500", "600", "800"] });

export const metadata = {
  title: "Hero Kidx",
  template: '%s | Hero Kidz',
};

export const fontBangla = localFont({
  src: "./../fonts/mayaboti-normal.ttf",
});



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className}  antialiased`}>
        <header className="py-2 md:w-11/12 mx-auto">
          <Navbar></Navbar>
        </header>
        <main className="py-2 md:w-11/12 mx-auto min-h-[calc(100vh-302px)]">
          {" "}
          {children}
        </main>
        <Footer></Footer>
      </body>
    </html>
  );
}
