import { ParentPageEnum } from '../../interfaces/enums/ParentPage.enum';
import { useOrderSections } from "../../hooks/useOrderSections.ts";
import { getParentPageName } from "../../interfaces/enums/ParentPage.enum.ts";
import SectionsList from "../sections/SectionsList.tsx";
import { useNavigate } from 'react-router-dom';
import { useGetSectionsByParentPage } from '../../hooks/sections/useGetSectionsByParentPage.ts';

interface Props {
  scaleOnHover?: boolean
}

function SectionsByParent({ scaleOnHover = true }: Props) {
  const {isFetching, sectionsByParent} = useGetSectionsByParentPage();
  const navigate = useNavigate();

  if(isFetching) return (<></>)
  return (
    <>
      {sectionsByParent && Object.entries(sectionsByParent).map(([parentPage, sections]) => (
        <div key={parentPage}>
          <div className="max-w-4xl mx-auto text-center p-2 my-2 bg-gray-300 rounded-lg">
            <h3 className="text-lg font-semibold">{getParentPageName(parentPage as ParentPageEnum)}</h3>
          </div>
          <SectionsList sections={useOrderSections(sections)} handleClick={(section) => navigate(`/sections/${section.id}`)} scaleOnHover={scaleOnHover} />
        </div>
      ))}
    </>

  )
}

export default SectionsByParent