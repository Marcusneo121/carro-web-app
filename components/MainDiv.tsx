import Footer from "@/components/Footer";
import NavBar from "./NavBar";
import { MainDivProps } from "@/types";

const MainDiv: React.FC<MainDivProps> = ({ children, className }) => {
  return (
    <div className={`${className}`}>
      <NavBar />
      <div className="mainDiv">{children}</div>
      <Footer />
    </div>
  );
};

export default MainDiv;
