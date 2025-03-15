export enum ParentPageEnum {
  HOME = 'HOME',
  DESCRIPTION = 'DESCRIPTION',
  ABOUT_ME = 'ABOUT_ME'
}

export const parentPageList: ParentPageEnum[] = [
  ParentPageEnum.HOME,
  ParentPageEnum.DESCRIPTION,
  ParentPageEnum.ABOUT_ME,
]

export const getParentPageName = (page: ParentPageEnum): string => {
  switch (page) {
    case ParentPageEnum.HOME:
      return "Inicio";
    case ParentPageEnum.DESCRIPTION:
      return "Descripción";
    case ParentPageEnum.ABOUT_ME:
      return "Sobre mi";
    default:
      return "Inicio";
  }
};
