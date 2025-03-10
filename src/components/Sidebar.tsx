import { useNavigate } from "react-router-dom";
import Sections from "../components/Sections";
import Button from "../components/microComponents/Button";
import Text from "../components/microComponents/Text";

function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="w-64 bg-gray-100 shadow h-screen p-4 flex flex-col border-r-3 border-l-0 border-gray-400">
      <Text as="h1" size="3xl">
        Mi Aplicación
      </Text>
      <Button className="mt-2" onClick={() => navigate("/albums")}>
        Albums
      </Button>
      <nav className="flex-1">
        <Sections
          handleClick={(section) => navigate(`/sections/${section.id}`)}
        />
      </nav>
      <Button className="mt-2" onClick={() => navigate("/create-section")}>
        Crear sección
      </Button>
    </div>
  );
}

export default Sidebar;
