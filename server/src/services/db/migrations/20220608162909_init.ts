import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("user", (table) => {
    table.string("name").notNullable();
    table.string("password_hash").notNullable();
    table.string("email").unique().notNullable();
    table
      .uuid("id")
      .primary()
      .unique()
      .defaultTo(knex.raw("(gen_random_uuid())"));
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("user");
}
