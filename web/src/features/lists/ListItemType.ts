import { ListType } from "./ListType";

export interface ListItemType {
  id: string;
  title: string;
  is_done: boolean;
  notes?: string;
  list_id?: string;
  list_title?: string;
  project_id?: string;
  project_title?: string;
  list_type?: string;
}

export interface ListItemProjectType {
  id: string;
  title: string;
}
