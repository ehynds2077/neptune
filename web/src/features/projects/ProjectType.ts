import { ListItemType } from "../lists/ListItemType";

export interface ProjectType {
  id: string;
  title: string;
  items: ListItemType[];
}
