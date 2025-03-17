export enum SectionStructureEnum {
  CAROUSEL = 'CAROUSEL',
  DIVIDED = 'DIVIDED',
  FULL_SCREEN = 'FULL_SCREEN'
}

export const sectionStructureList: SectionStructureEnum[] = [
  SectionStructureEnum.CAROUSEL,
  SectionStructureEnum.DIVIDED,
  SectionStructureEnum.FULL_SCREEN,
]

export const getSectionStructureName = (structure: SectionStructureEnum): string => {
  switch (structure) {
    case SectionStructureEnum.CAROUSEL:
      return "Carrusel";
    case SectionStructureEnum.DIVIDED:
      return "Dividido";
    case SectionStructureEnum.FULL_SCREEN:
      return "Pantalla completa";
    default:
      return "Inicio";
  }
};
