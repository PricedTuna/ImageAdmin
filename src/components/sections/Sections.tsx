import useGetSections from "../../hooks/sections/useGetSections.ts";
import { ISection } from "../../interfaces/Section";
import Text from "../microComponents/Text.tsx";
import Spinner from "../Spinner.tsx";
import SectionsList from "./sectionList/SectionsList.tsx";

interface Props {
  handleClick: (section: ISection) => void;
}

function Sections({ handleClick }: Props) {
  const { isFetching, sections } = useGetSections()

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
