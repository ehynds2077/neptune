import { ListType } from "./ListType";

export interface ListItemType {
  id: string;
  title: string;
  is_done: boolean;
  notes?: string;
  list?: ListType;
}
