import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("list_item", (table) => {
    table.dropForeign("list_id");
  });

  await knex.schema.alterTable("list_item", (table) => {
    table
      .foreign("list_id")
      .references("id")
      .inTable("list")
      .onDelete("SET NULL");
  });
}

export async function down(knex: Knex): Promise<void> {}
