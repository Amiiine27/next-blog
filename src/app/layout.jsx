import "./globals.css";
import { Poppins } from "next/font/google";
import NavLink from "@/components/NavLink";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

/*import localFont from "next/font/local";

 // const myFont = localFont({src: "../fonts/Poppins-Bold.ttf"}) si on a a qu'une mais on en a 2 donc :

const myFont = localFont({
  src: [
    {
      path: "../fonts/Poppins-Bold.ttf",
      weight: "600",
      style: "bold",
    },
    {
      path: "../fonts/Poppins-Light.ttf",
      weight: "200",
      style: "light",
    },
  ],
}); */

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "400", "700"],
});
export default function RootLayout({ children }) {

  return (
    <html lang="fr">
      <body className={poppins.className}>
        <header>
          <Navigation/>
        </header>

        <main>{children}</main>

        <Footer/>
      </body>
    </html>
  );
}
