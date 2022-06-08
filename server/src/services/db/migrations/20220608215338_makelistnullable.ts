import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("list_item", (table) => {
    table.setNullable("list_id");
  });
}

export async function down(knex: Knex): Promise<void> {}
