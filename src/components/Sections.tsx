import { useEffect, useState } from "react";
import { getAllSections } from "../service/section.service";
import { ISection } from "../interfaces/Section";
import SectionsList from "./sections/SectionsList";
import Spinner from "./Spinner";

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
    <>
    {
      isFetching
        ? <Spinner />
        : <SectionsList sections={sections} handleClick={handleClick} />
    }
    </>

  )
}

export default Sections
