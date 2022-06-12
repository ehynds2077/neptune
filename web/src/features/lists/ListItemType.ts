import { ListType } from "./ListType";

export interface ListItemType {
  id: string;
  title: string;
  is_done: boolean;
  notes?: string;
  listId: string;
  project?: ListItemProjectType;
}

export interface ListItemProjectType {
  id: string;
  title: string;
}
