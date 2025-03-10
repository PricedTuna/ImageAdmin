import { ParentPageEnum } from "./enums/ParentPage.enum";
import { SectionStructureEnum } from "./enums/SectionStructure.enum";

export interface ISection {
  id?: string; 
  title: string;
  text: string;
  order: number;
  parentPage: ParentPageEnum;
  albumId: string;
  structureType: SectionStructureEnum;
}