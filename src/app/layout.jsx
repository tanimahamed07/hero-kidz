import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import Footer from "@/components/layouts/Footer";
import Navbar from "@/components/layouts/Navbar";
import NextAuthProvider from "../Provider/NextAuthProvider";

const poppins = Poppins({ weight: ["100", "200", "400", "500", "600", "800"] });

export const metadata = {
  metadataBase: new URL("https://hero-kidz-taupe.vercel.app/"),

  title: {
    default: "HeroKidz – Smart Online Shopping Platform",
    template: "%s | HeroKidz",
  },

  description:
    "Discover high-quality educational and lifestyle products at HeroKidz. Smart shopping, trusted quality, and fast delivery.",

  applicationName: "HeroKidz",

  authors: [{ name: "Tanim Ahamed" }],
  creator: "Tanim Ahamed",
  publisher: "HeroKidz",

  keywords: [
    "online shop",
    "educational products",
    "kids learning board",
    "smart shopping",
    "ecommerce bangladesh",
    "next.js ecommerce",
  ],

  icons: {
    icon: "https://ibb.co.com/5xs2p8xG",
    apple: "https://ibb.co.com/5xs2p8xG",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hero-kidz-taupe.vercel.app/",
    siteName: "HeroKidz",
    title: "HeroKidz – Smart Online Shopping Platform",
    description:
      "Shop educational and lifestyle products with confidence. Quality products and easy checkout.",
    images: [
      {
        url: "https://ibb.co.com/TMyTmDv0",
        width: 1200,
        height: 630,
        alt: "HeroKidz Homepage Preview",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "HeroKidz – Smart Online Shopping Platform",
    description:
      "Discover educational and lifestyle products with fast delivery.",
    images: ["https://ibb.co.com/TMyTmDv0"],
    creator: "@yourtwitterhandle",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export const fontBangla = localFont({
  src: "./../fonts/mayaboti-normal.ttf",
});

export default function RootLayout({ children }) {
  return (
    <NextAuthProvider>
      <html lang="en">
        <body className={`${poppins.className}  antialiased`}>
          <header className="py-2 md:w-11/12 mx-auto">
            <Navbar></Navbar>
          </header>
          <main className="py-2 md:w-11/12 mx-auto min-h-[calc(100vh-302px)]">
            {children}
          </main>
          <Footer></Footer>
        </body>
      </html>
    </NextAuthProvider>
  );
}
