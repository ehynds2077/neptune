import { List_ListType } from "../lists/ListType";

export interface ProjectListItemType {
  id: string;
  title: string;
  is_done: boolean;
  notes?: string;
  list_type: List_ListType;
}

export interface ProjectType {
  id: string;
  title: string;
  items: ProjectListItemType[];
}
