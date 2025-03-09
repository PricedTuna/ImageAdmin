import { ParentPageEnum } from "./enums/ParentPage.enum";
import { SectionStructureEnum } from "./enums/SectionStructure.enum";

export interface Section {
  id?: string; 
  title: string;
  text: string;
  order: number;
  parentPage: ParentPageEnum;
  albumId: string;
  structureType: SectionStructureEnum;
}