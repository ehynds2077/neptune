import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("list_item", (table) => {
    table.dropForeign("project_id");
  });

  await knex.schema.alterTable("list_item", (table) => {
    table
      .foreign("project_id")
      .references("id")
      .inTable("project")
      .onDelete("SET NULL");
  });

  await knex.schema.alterTable("list", (table) => {
    table.dropForeign("project_id");
  });

  await knex.schema.alterTable("list", (table) => {
    table
      .foreign("project_id")
      .references("id")
      .inTable("project")
      .onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {}
