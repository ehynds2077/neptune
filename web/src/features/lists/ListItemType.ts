import { ListType } from "./ListType";

export interface ListItemType {
  id: string;
  title: string;
  is_done: boolean;
  notes?: string;
  list_id: string;
  project?: ListItemProjectType;
  project_id?: string;
}

export interface ListItemProjectType {
  id: string;
  title: string;
}
