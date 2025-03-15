import { useEffect, useState } from "react";
import { getAllSections } from "../service/section.service";
import { ISection } from "../interfaces/Section";
import SectionsList from "./sections/SectionsList";
import Spinner from "./Spinner";
import Text from "./microComponents/Text.tsx";

interface Props {
  handleClick: (section: ISection) => void;
}

function Sections({handleClick}: Props) {
    const [sections, setSections] = useState<ISection[]>([])
    const [isFetching, setIsFetching] = useState(false)

    const handleFetchSections = async () => {
      setIsFetching(true)

      const sections = await getAllSections()
      setSections(sections)

      setIsFetching(false)
    }

    useEffect(() => {
      handleFetchSections()
    }, [])

  return (
    <div className="max-w-7xl mx-auto p-4">
      <Text as="h2" size="2xl">Secciones</Text>
    {
      isFetching
        ? <Spinner />
        : <SectionsList sections={sections} handleClick={handleClick} />
    }
    </div>

  )
}

export default Sections
