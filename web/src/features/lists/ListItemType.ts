import { ListType } from "./ListType";

export interface ListItemType {
  id: string;
  title: string;
  is_done: boolean;
  notes?: string;
  list_id: string;
  project?: ListItemProjectType;
}

export interface ListItemProjectType {
  id: string;
  title: string;
}
