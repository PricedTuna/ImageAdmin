import { useNavigate } from "react-router-dom";
import Button from "../components/microComponents/Button";
import Text from "../components/microComponents/Text";
import { ParentPageEnum } from "../interfaces/enums/ParentPage.enum.ts";
import { ISection } from "../interfaces/Section.ts";
import { getAllSections } from "../service/section.service.ts";
import { useEffect, useState } from "react";

export interface SectionsByParentPage {
  [key: string]: ISection[];
}

function Sidebar() {
  const [sectionsByParent, setSectionsByParent] = useState< Record<ParentPageEnum, ISection[]> | null >(null)
  const [isFetching, setIsFetching] = useState(false)
  const navigate = useNavigate();

  const handleFetchSections = async () => {
    setIsFetching(true)

    const sections = await getAllSections()

    // Agrupación usando reduce
    const groupedByParentPage = sections.reduce((acc, section) => {
      // Si no existe la llave para el parentPage, la inicializamos como un array vacío
      if (!acc[section.parentPage]) {
        acc[section.parentPage] = [];
      }
      // Insertamos la sección en el array correspondiente
      acc[section.parentPage].push(section);
      return acc;
    }, {} as Record<ParentPageEnum, ISection[]>);

    setSectionsByParent(groupedByParentPage)

    setIsFetching(false)
  }

  useEffect(() => {
    handleFetchSections()
  }, [])

  if(isFetching) return (<></>)
  return (
    <div className="w-64 bg-gray-100 shadow h-screen p-4 flex flex-col border-r-3 border-l-0 border-gray-400">
      <Text as="h1" size="3xl">
        Mi Aplicación
      </Text>
      <Button className="mt-2" onClick={() => navigate("/albums")}>
        Albums
      </Button>
      <nav className="flex-1">

          {sectionsByParent && Object.entries(sectionsByParent).map(([parentPage, sections]) => (
            <div key={parentPage}>
              <h2>{parentPage}</h2>
              {sections.map((section) => (
                // Usamos section.id o, si no existe, una combinación única como section.title
                <h1>{section.title}</h1>
              ))}
            </div>
          ))}

        {/*<Sections*/}
        {/*  handleClick={(section) => navigate(`/sections/${section.id}`)}*/}
        {/*/>*/}
      </nav>
      <Button className="mt-2" onClick={() => navigate("/create-section")}>
        Crear sección
      </Button>
    </div>
  );
}

export default Sidebar;
