import { useEffect, useState } from "react";
import SectionView from "./SectionView";
import { getAllSections } from "../service/section.service";
import { Section } from "../interfaces/Section";
import { useNavigate } from "react-router-dom";
import CenterComponent from "./microComponents/CenterComponent";
import Button from "./microComponents/Button";
import Text from "./microComponents/Text";
import SectionList from "./sections/SectionList";

function Sections() {
    const [sections, setSections] = useState<Section[]>([])
    const [sectionSelected, setSectionSelected] = useState<Section | null>(null)

    const navigate = useNavigate();
  
  
    const handleFetchSections = async () => {
      const sections = await getAllSections()
      setSections(sections)
    }
  
    useEffect(() => {
      handleFetchSections()
    }, [])

  return (
    <CenterComponent>
      <Text as="h1" size="4xl">Sections!</Text>
      <Button variant="success" width={"full"} onClick={() => navigate('/create-section')}>Agregar section</Button>
      
      <SectionList sections={sections} />

      {sectionSelected && (
        <SectionView section={sectionSelected} />
      ) }

    </CenterComponent>
  )
}

export default Sections
