import { useEffect, useState } from "react";
import { ParentPageEnum } from "../../interfaces/enums/ParentPage.enum.ts";
import { ISection } from "../../interfaces/Section.ts";
import { listenAllSections } from "../../service/section.service.ts";

export const useGetSectionsByParentPage = () => {
  const [sectionsByParent, setSectionsByParent] = useState<Record<ParentPageEnum, ISection[]> | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  const sortSectionsByOrder = (sections: ISection[]) => {
    console.log("1"); // ¡Inicio de sortSectionsByOrder!
    if (!Array.isArray(sections)) {
      console.error("sections no es un array:", sections);
      return {};
    }

    const groupedByParentPage = sections.reduce((acc, section) => {
      // Si parentPage no existe o es nulo, podrías asignarle un valor por defecto:
      const parent = section.parentPage || 'sin_categoria';

      if (!acc[parent]) {
        acc[parent] = [];
      }

      acc[parent].push(section);
      return acc;
    }, {} as Record<string, ISection[]>);
    console.log("2"); // ¡Final de sortSectionsByOrder!

    return groupedByParentPage;
  };

  useEffect(() => {
    setIsFetching(true);

    const unsubscribe = listenAllSections((sections) => {
      try {
        console.log("hubo cambio");
        console.log("Contenido de sections:", sections);
        const sorted = sortSectionsByOrder(sections);
        console.log("va a hacer no se qué");
        setSectionsByParent(sorted);
      } catch (e) {
        console.log("error");
        console.log(JSON.stringify(e));
      } finally {
        setIsFetching(false);
      }
    });

    return () => {
      console.log("se desconecto");
      unsubscribe()
    };
  }, []);

  return { isFetching, sectionsByParent };
};
