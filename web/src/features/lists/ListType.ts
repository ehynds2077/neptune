import { ListItemType } from "./ListItemType";

export const listTypes = ["NEXT", "SOMEDAY", "WAITING", "AGENDA", "REFERENCE"];
export type List_ListType = typeof listTypes[number];

export interface ListType {
  id: string;
  title: string;
  list_type: List_ListType;
  created_at: Date;

  items: ListItemType[];
}
