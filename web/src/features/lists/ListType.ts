import { ListItemType } from "./ListItemType";

export interface ListType {
  id: string;
  title: string;

  items: ListItemType[];
}
