import { Outlet, useNavigate } from "react-router-dom";
import Sections from "../components/Sections";
import Text from "../components/microComponents/Text";
import Button from "../components/microComponents/Button";

const MainLayout: React.FC = () => {

  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex">
      <div className="w-64 bg-gray-100 shadow h-screen p-4 flex flex-col">
        <Text as="h1" size="3xl">Mi Aplicación</Text>
        <Button className="mt-2" onClick={() => navigate("/albums")}>Albums</Button>
        <nav className="flex-1">
          <Sections handleClick={(section) => navigate(`/sections/${section.id}`)} />
        </nav>
        <Button className="mt-2" onClick={() => navigate("/create-section")}>Crear sección</Button>
      </div>
      <main className="flex-1 h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;