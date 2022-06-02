import { Knex, knex } from "knex";
import { RefreshToken } from "./models/RefreshToken";
import { User } from "./models/User";

declare module "knex/types/tables" {
  interface Tables {
    user: User;
    user_composite: Knex.CompositeTableType<
      User,
      Pick<User, "name"> & Pick<User, "email"> & Pick<User, "password_hash">,
      Partial<Omit<User, "id">>
    >;

    refresh_token: RefreshToken;
    refresh_token_composite: Knex.CompositeTableType<
      RefreshToken,
      Pick<RefreshToken, "token"> &
        Pick<RefreshToken, "expires"> &
        Pick<RefreshToken, "user_id">
    >;
  }
}
