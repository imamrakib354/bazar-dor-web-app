
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";

const hindSiliguri = Hind_Siliguri({
  subsets: ["latin", "bengali"],
  weight: "400",
});

export const metadata = {
  title: "My Bazar Dor Web App",
  description: "This is a web app for Bazar Dor",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="bn"
      className={`${hindSiliguri.className} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Header />

        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
