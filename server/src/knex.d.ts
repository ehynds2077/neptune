import { Knex, knex } from "knex";
import { InboxItem, ListItem } from "./models/Inbox";
import { List } from "./models/List";
import { RefreshToken } from "./models/RefreshToken";
import { User } from "./models/User";

declare module "knex/types/tables" {
  interface Tables {
    user: User;
    user_composite: Knex.CompositeTableType<
      // Base
      User,
      // Insert
      Pick<User, "name"> & Pick<User, "email"> & Pick<User, "password_hash">,
      // Update
      Partial<Omit<User, "id">>
    >;

    refresh_token: RefreshToken;
    refresh_token_composite: Knex.CompositeTableType<
      // Base
      RefreshToken,
      // Insert
      Pick<RefreshToken, "token"> &
        Pick<RefreshToken, "expires"> &
        Pick<RefreshToken, "user_id">
    >;

    list: List;
    list_composite: Knex.CompositeTableType<List, Pick<List, "title">>;

    list_item: ListItem;
    list_item_composite: Knex.CompositeTableType<
      // Base
      ListItem,
      // Insert
      Pick<ListItem, "title"> &
        Pick<ListItem, "user_id"> &
        Pick<ListItem, "created_at"> &
        Pick<ListItem, "id"> &
        Partial<Pick<ListItem, "notes">>,
      // Update
      Partial<
        Omit<ListItem, "user_id"> &
          Omit<ListItem, "id"> &
          Omit<ListItem, "created_at">
      >
    >;
  }
}
