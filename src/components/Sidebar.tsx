import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/microComponents/Button";
import Text from "../components/microComponents/Text";
import SectionsByParent from "./sections/SectionsByParent.tsx";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function Sidebar() {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className={"flex bg-gray-100"}>
      <button
        className="md:hidden m-2 position-absolute p-2 border-0"
        onClick={toggleSidebar}
        style={{ top: '-3px', right: '-3px' }}
      >
        {isVisible ? <FaChevronLeft/> : <FaChevronRight/>}
      </button>

      {/* Sidebar: siempre visible en pantallas md en adelante, condicional en móviles */}
      <div
        className={`w-64 shadow h-screen p-4 flex flex-col border-r-3 border-gray-400 
                    ${isVisible ? "flex" : "hidden"} md:flex`}
      >
        <Text as="h1" size="3xl" onClick={() => navigate("/")} className="cursor-pointer">
          Websiter
        </Text>
        <div className="flex flex-col pb-2">
          <Button className="mt-2" onClick={() => navigate("/sections")}>
            Secciones
          </Button>
          <Button className="mt-2" onClick={() => navigate("/albums")}>
            Albums
          </Button>
        </div>
        <nav className="flex-1 scrollContainer">
          <SectionsByParent scaleOnHover={false} isDraggable={false}/>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;
