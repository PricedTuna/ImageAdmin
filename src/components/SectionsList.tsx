import { useEffect, useState } from "react";
import SectionView from "./SectionView";
import { getAllSections } from "../service/section.service";
import { Section } from "../interfaces/Section";
import SectionForm from "./Section";

function SectionsList() {
    const [sections, setSections] = useState<Section[]>([])
    const [sectionSelected, setSectionSelected] = useState<Section | null>(null)
  
    const [isSectionFormOpen, setIsSectionFormOpen] = useState(false)
  
    const handleFetchSections = async () => {
      const sections = await getAllSections()
      setSections(sections)
    }
  
    useEffect(() => {
      handleFetchSections()
    }, [])

  return (
    <div>
      <h1>Sections!</h1>
      <button onClick={() => setIsSectionFormOpen(prev => !prev)}>Agregar section</button>

      {isSectionFormOpen && (
        <SectionForm />
      )}
      
      <ul>
        {
          sections.map((section) => (
            <li onClick={() => setSectionSelected(section)}>{section.id} - {section.title}</li>
          ))
        }
      </ul>

      {sectionSelected && (
        <SectionView section={sectionSelected} />
      ) }

    </div>
  )
}

export default SectionsList
