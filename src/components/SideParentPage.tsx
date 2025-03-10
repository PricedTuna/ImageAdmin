import { useNavigate } from "react-router-dom"
import { ISection } from "../interfaces/Section"
import Text from "./microComponents/Text"

interface Props {
  pageName: string
  sections: ISection[]
}

function SideParentPage({pageName, sections}:Props) {

  const navigate = useNavigate()

  return (
    <div>
      <Text as="p" size="md">{pageName}</Text>
      <ul>
        {
          sections.map((section) => (
            <ul onClick={() => navigate(`/sections/${section.id}`)}>{section.title}</ul>
          ))
        }
      </ul>
    </div>
  )
}

export default SideParentPage
