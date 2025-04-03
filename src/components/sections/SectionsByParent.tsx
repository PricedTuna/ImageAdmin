import { ParentPageEnum } from '../../interfaces/enums/ParentPage.enum';
import { useOrderSections } from "../../hooks/useOrderSections.ts";
import { getParentPageName } from "../../interfaces/enums/ParentPage.enum.ts";
import SectionsList from "./sectionList/SectionsList.tsx";
import { useNavigate } from 'react-router-dom';
import { useGetSectionsByParentPage } from '../../hooks/sections/useGetSectionsByParentPage.ts';
import { useEffect } from "react";
import { useDeleteSection } from "../../hooks/sections/useDeleteSection.ts";

interface Props {
  scaleOnHover?: boolean
  isDraggable?: boolean
  showDeleteButton?: boolean
}

function SectionsByParent({ scaleOnHover = true, isDraggable = true, showDeleteButton = false }: Props) {
  const {isFetching, sectionsByParent} = useGetSectionsByParentPage();
  const navigate = useNavigate();
  const { handleDelete } = useDeleteSection()

  const onDelete = showDeleteButton ? handleDelete : undefined;

  useEffect(() => {
  }, [sectionsByParent])

  if(isFetching) return (<></>)
  return (
    <>
      {sectionsByParent && Object.entries(sectionsByParent).map(([parentPage, sections]) => (
        <div key={parentPage}>
          <div className="max-w-4xl mx-auto text-center p-2 my-2 bg-gray-300 rounded-lg">
            <h3 className="text-lg font-semibold">{getParentPageName(parentPage as ParentPageEnum)}</h3>
          </div>
          <SectionsList sections={useOrderSections(sections)} handleClick={(section) => navigate(`/sections/${section.id}`)} scaleOnHover={scaleOnHover} isDraggable={isDraggable} onDelete={onDelete} />
        </div>
      ))}
    </>

  )
}

export default SectionsByParent
