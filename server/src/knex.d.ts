import { Knex, knex } from "knex";
import { User } from "./models/User";

declare module "knex/types/tables" {
  interface Tables {
    user: User;

    user_composite: Knex.CompositeTableType<
      User,
      Pick<User, "name"> & Pick<User, "email"> & Pick<User, "hashedPass">,
      Partial<Omit<User, "id">>
    >;
  }
}
