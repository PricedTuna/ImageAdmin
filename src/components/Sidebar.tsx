import { useNavigate } from "react-router-dom";
import Button from "../components/microComponents/Button";
import Text from "../components/microComponents/Text";
import { ISection } from "../interfaces/Section.ts";
import SectionsByParent from "./sections/SectionsByParent.tsx";

export interface SectionsByParentPage {
  [key: string]: ISection[];
}

function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="w-64 bg-gray-100 shadow h-screen p-4 flex flex-col border-r-3 border-l-0 border-gray-400">
      <Text as="h1" size="3xl" onClick={() => navigate("/")} className="cursor-pointer">
        Websiter
      </Text>
      <Button className="mt-2" onClick={() => navigate("/sections")}>
        Secciones
      </Button>
      <Button className="mt-2" onClick={() => navigate("/albums")}>
        Albums
      </Button>
      <nav className="flex-1 scrollContainer">
        <SectionsByParent scaleOnHover={false} />
      </nav>
    </div>
  );
}

export default Sidebar;
