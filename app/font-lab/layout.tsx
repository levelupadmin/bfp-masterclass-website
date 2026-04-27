import {
  Bebas_Neue,
  Oswald,
  Teko,
  Rozha_One,
  Yatra_One,
  Big_Shoulders_Display,
  Cormorant_Garamond,
  Playfair_Display,
  Marcellus,
} from "next/font/google";
import "./font-lab.css";

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400", variable: "--lab-bebas", display: "swap" });
const oswald = Oswald({ subsets: ["latin"], weight: ["400", "600"], variable: "--lab-oswald", display: "swap" });
const teko = Teko({ subsets: ["latin"], weight: ["400", "600"], variable: "--lab-teko", display: "swap" });
const rozha = Rozha_One({ subsets: ["latin"], weight: "400", variable: "--lab-rozha", display: "swap" });
const yatra = Yatra_One({ subsets: ["latin"], weight: "400", variable: "--lab-yatra", display: "swap" });
const bigShoulders = Big_Shoulders_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--lab-bigshoulders",
  display: "swap",
});
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--lab-cormorant",
  display: "swap",
});
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--lab-playfair",
  display: "swap",
});
const marcellus = Marcellus({ subsets: ["latin"], weight: "400", variable: "--lab-marcellus", display: "swap" });

export default function FontLabLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${bebas.variable} ${oswald.variable} ${teko.variable} ${rozha.variable} ${yatra.variable} ${bigShoulders.variable} ${cormorant.variable} ${playfair.variable} ${marcellus.variable}`}
    >
      {children}
    </div>
  );
}
