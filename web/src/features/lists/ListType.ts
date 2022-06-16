import { ListItemType } from "./ListItemType";

export interface ListTypeDict {
  NEXT: string;
  WAITING: string;
  SOMEDAY: string;
  AGENDA: string;
  REFERENCE: string;
  PROJECT_SUPPORT: string;
  [key: string]: string;
}
export const listTypeDict: ListTypeDict = {
  NEXT: "Next",
  WAITING: "Waiting",
  SOMEDAY: "Someday / Maybe",
  AGENDA: "Agenda",
  REFERENCE: "Reference",
  PROJECT_SUPPORT: "Project Support",
};

export const listTypesWithSupport = Object.keys(listTypeDict);
export type List_ListTypeSupport = typeof listTypesWithSupport[number];

export const listTypes = ["NEXT", "SOMEDAY", "WAITING", "AGENDA", "REFERENCE"];
export type List_ListType = typeof listTypes[number];

export interface ListType {
  id: string;
  title: string;
  list_type: List_ListType;
  created_at: Date;
  depth: number;

  items: ListItemType[];
}
