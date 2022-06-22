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

  await knex.schema.createTable("list", (table) => {
    table
      .uuid("id")
      .primary()
      .unique()
      .defaultTo(knex.raw("(gen_random_uuid())"));

    table.string("title");
    table.datetime("created_at").notNullable().defaultTo(knex.fn.now());
    table.integer("order").notNullable();
    table.uuid("user_id").notNullable().references("id").inTable("user");

    table
      .uuid("list_parent_id")
      .references("id")
      .inTable("list")
      .onDelete("CASCADE");
    table
      .enu("list_type", [
        "NEXT",
        "SOMEDAY",
        "WAITING",
        "AGENDA",
        "PROJECT_SUPPORT",
        "REFERENCE",
      ])
      .notNullable()
      .defaultTo("NEXT");
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

    table.uuid("list_id").references("id").inTable("list").onDelete("SET NULL");
    table.uuid("user_id").notNullable().references("id").inTable("user");
  });

  await knex.schema.createTable("refresh_token", (table) => {
    table.string("token_hash").notNullable().primary().unique();
    table.datetime("expires", { useTz: false }).notNullable();
    table.uuid("user_id").notNullable().references("id").inTable("user");
  });

  await knex.schema.createTable("project", (table) => {
    table
      .uuid("id")
      .primary()
      .unique()
      .defaultTo(knex.raw("(gen_random_uuid())"));

    table.string("title").notNullable();
    table.datetime("created_at").notNullable().defaultTo(knex.fn.now());

    table.uuid("user_id").notNullable().references("id").inTable("user");
  });

  await knex.schema.alterTable("list_item", (table) => {
    table
      .uuid("project_id")
      .references("id")
      .inTable("project")
      .onDelete("SET NULL");
  });

  await knex.schema.alterTable("list", (table) => {
    table
      .uuid("project_id")
      .references("id")
      .inTable("project")
      .onDelete("CASCADE");
  });

  await knex.schema.raw(
    "ALTER TABLE list ADD CHECK ((list_type <> 'PROJECT_SUPPORT' AND title IS NOT NULL) OR (project_id IS NOT NULL))"
  );
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.table("list_item", (table) => {
    table.dropColumn("project_id");
  });
  await knex.schema.table("list", (table) => {
    table.dropColumn("project_id");
  });
  await knex.schema.dropTableIfExists("project");
  await knex.schema.dropTableIfExists("refresh_token");
  await knex.schema.dropTableIfExists("list_item");
  await knex.schema.dropTableIfExists("list");
  await knex.schema.dropTableIfExists("user");
}
