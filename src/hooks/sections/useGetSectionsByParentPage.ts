import { useEffect, useState } from "react";
import { ParentPageEnum } from "../../interfaces/enums/ParentPage.enum.ts";
import { ISection } from "../../interfaces/Section.ts";
import { getAllSections } from "../../service/section.service.ts";

export const useGetSectionsByParentPage = () => {
  const [sectionsByParent, setSectionsByParent] = useState<Record<ParentPageEnum, ISection[]> | null>(null);
  const [isFetching, setIsFetching] = useState(false);

    const fetchSectionsByParent = async () => {
      setIsFetching(true);
  
      const sections = await getAllSections();
  
      const groupedByParentPage = sections.reduce((acc, section) => {
        if (!acc[section.parentPage]) {
          acc[section.parentPage] = [];
        }
        
        acc[section.parentPage].push(section);
        return acc;
      }, {} as Record<ParentPageEnum, ISection[]>);
  
      setIsFetching(false);
      
      return groupedByParentPage
    };
  
    useEffect(() => {
      fetchSectionsByParent().then(setSectionsByParent);
    }, []);

  return {isFetching, sectionsByParent, fetchSectionsByParent}
}