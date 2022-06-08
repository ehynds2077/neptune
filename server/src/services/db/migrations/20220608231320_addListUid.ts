import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("list", (table) => {
    table.uuid("user_id").notNullable().references("id").inTable("user");
  });
}

export async function down(knex: Knex): Promise<void> {}
