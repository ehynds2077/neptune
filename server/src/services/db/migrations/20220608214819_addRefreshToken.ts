import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("refresh_token", (table) => {
    table.string("token_hash").notNullable().primary().unique();
    table.datetime("expires", { useTz: false }).notNullable();
    table.uuid("user_id").notNullable().references("id").inTable("user");
  });
}

export async function down(knex: Knex): Promise<void> {}
