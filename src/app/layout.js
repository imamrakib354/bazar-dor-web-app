import { Hind_Siliguri } from "next/font/google";
import "./globals.css";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";

const hindSiliguri = Hind_Siliguri({
  subsets: ["latin", "bengali"],
  weight: "400",
});

export const metadata = {
  title: "Bazar Dor | বাজার দর",
  description: "বাংলাদেশের দৈনন্দিন বাজারের পণ্যের দাম ও তুলনা",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="bn"
      data-theme="light"
      className={`${hindSiliguri.className} h-full antialiased`}
    >
      <body className="flex min-h-full min-w-0 flex-col bg-[#F0F5F0]">

        <Header />

        <main className="min-w-0 flex-1">
          {children}
        </main>

        <Footer />

        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            duration: 3500,
            style: {
              background: "#F8FAF9",
              color: "#1F2937",
              border: "1px solid #DFE7E0",
              fontFamily: "inherit",
            },
            success: {
              iconTheme: {
                primary: "#05893E",
                secondary: "#FFFFFF",
              },
            },
          }}
        />

      </body>
    </html>
  );
}
