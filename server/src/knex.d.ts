import { Knex, knex } from "knex";
import { InboxItem } from "./models/InboxItem";
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
        Pick<RefreshToken, "expires"> &
        Pick<RefreshToken, "user_id">
    >;

    inbox_item: InboxItem;
    inbox_item_composite: Knex.CompositeTableType<
      // Base
      InboxItem,
      // Insert
      Pick<InboxItem, "title"> &
        Pick<InboxItem, "user_id"> &
        Pick<InboxItem, "id"> &
        Partial<Pick<InboxItem, "notes">>,
      // Update
      Partial<Omit<InboxItem, "user_id", "id">>
    >;
  }
}
