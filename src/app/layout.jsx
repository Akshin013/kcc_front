'use client';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from './Components/Common/Header';
import Navbar from "./Components/Common/Navbar";
import { usePathname } from 'next/navigation';
import Script from 'next/script';

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const hideNavbar = pathname.startsWith('/AdminPage'); // путь к AdminPage

  // ЗАПИСАТТЬ В ТИТЛ KCC
  return (
    <html lang="en">
      <head>
        <title>KCC Auto</title>

        {/* ✅ Google Analytics (GA4) */}
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=G-MPGF1TQLE8`}
        />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-MPGF1TQLE8');
          `}
        </Script>

        <link rel="icon" type="image/png" sizes="16x16" href="https://res.cloudinary.com/dsigbmb7p/image/upload/c_fill,w_16,h_16,f_auto,q_auto/v1759259467/logo_blank_c5xuyi.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="https://res.cloudinary.com/dsigbmb7p/image/upload/c_fill,w_32,h_32,f_auto,q_auto/v1759259467/logo_blank_c5xuyi.png"/>
        <link rel="icon" type="image/png" sizes="48x48" href="https://res.cloudinary.com/dsigbmb7p/image/upload/c_fill,w_48,h_48,f_auto,q_auto/v1759259467/logo_blank_c5xuyi.png"/>
        <link rel="icon" type="image/png" sizes="256x256" href="https://res.cloudinary.com/dsigbmb7p/image/upload/c_fill,w_256,h_256,f_auto,q_auto/v1759259467/logo_blank_c5xuyi.png"/>
      </head>

      <body className="bg-[#333333] lg:px-48">
        <Header />
        {children}
        {!hideNavbar && <Navbar />}
      </body>
    </html>
  );
}
