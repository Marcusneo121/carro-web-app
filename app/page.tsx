import Image from "next/image";
import { Button } from "@/components/ui/button";
import Hero from "./components/Hero";
import ContentOne from "./components/ContentOne";
import ContentTwo from "./components/ContentTwo";
import MainDiv from "@/components/MainDiv";

export default function Home() {
  return (
    <MainDiv className="">
      <div className="mainDiv">
        <Hero />
        <ContentOne />
        <ContentTwo />
      </div>
    </MainDiv>
  );
}

// The reason the use Footer and Header here is because not sure why
// Next.js when you use Route Group, and in nested Layout file you put HTML & Body tag,
// and go back to root page, it causing error

// Example : Home (RootLayout) -> Login (Nested Layout with HTML and Body tag) -> back to -> Home (It crash)

// Solution was to remove HTML and Body tag in nested layout file, reference in the link below:
// https://github.com/vercel/next.js/discussions/25049

// However, this will make the Header and Footer to appear which doesnt fit what I want to make header footer
// disappear in the Login and SignUp, hence I created a "Parent" file that store Header and footer, so that
// I dont need to write redundant code for pages that need it
