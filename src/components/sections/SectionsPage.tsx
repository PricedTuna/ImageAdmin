import Text from "../microComponents/Text.tsx";
import { FaPlus } from "react-icons/fa";
import Button from "../microComponents/Button.tsx";
import { useNavigate } from "react-router-dom";
import SectionsByParent from "./SectionsByParent.tsx";

const SectionsPage = () => {
  const navigate = useNavigate()

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between">
      <Text as="h1" size="3xl">Secciones</Text>
      <Button icon={<FaPlus />} onClick={() => navigate("/create-section")} variant="success" >Agregar Sección</Button>
      </div>
      <SectionsByParent />
    </div>
  );
};

export default SectionsPage;
