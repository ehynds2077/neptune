import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("list", (table) => {
    table
      .uuid("id")
      .primary()
      .unique()
      .defaultTo(knex.raw("(gen_random_uuid())"));

    table.string("title").notNullable();
    table.datetime("created_at").notNullable().defaultTo(knex.fn.now());
  });

  await knex.schema.createTable("list_item", (table) => {
    table
      .uuid("id")
      .primary()
      .unique()
      .defaultTo(knex.raw("(gen_random_uuid())"));

    table.string("title").notNullable();
    table.boolean("is_done").notNullable().defaultTo(false);
    table.text("notes");
    table.datetime("created_at").notNullable().defaultTo(knex.fn.now());

    table.uuid("user_id").notNullable().references("id").inTable("user");
    table.uuid("list_id").notNullable().references("id").inTable("list");
  });
}

export async function down(knex: Knex): Promise<void> {}
