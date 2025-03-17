import { useEffect, useState } from "react";
import { ParentPageEnum } from "../../interfaces/enums/ParentPage.enum.ts";
import { ISection } from "../../interfaces/Section.ts";
import { listenAllSections } from "../../service/section.service.ts";

export const useGetSectionsByParentPage = () => {
  const [sectionsByParent, setSectionsByParent] = useState<Record<ParentPageEnum, ISection[]> | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  const sortSectionsByOrder = (sections: ISection[]) => {
    return sections.reduce((acc, section) => {
      // Si parentPage no existe o es nulo, podrías asignarle un valor por defecto:
      const parent = section.parentPage;

      if (!acc[parent]) {
        acc[parent] = [];
      }

      acc[parent].push(section);
      return acc;
    }, {} as Record<string, ISection[]>);
  };

  useEffect(() => {
    setIsFetching(true);

    const unsubscribe = listenAllSections((sections) => {
      try {
        const sorted = sortSectionsByOrder(sections);
        setSectionsByParent(sorted);
      } catch (e) {
        console.error("Error al ordenar las secciones:", e);
      } finally {
        setIsFetching(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return { isFetching, sectionsByParent };
};
