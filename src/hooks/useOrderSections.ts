import { ISection } from "../interfaces/Section";

export const useOrderSections = (sections: ISection[]) => sections.sort((a, b) => a.order - b.order)