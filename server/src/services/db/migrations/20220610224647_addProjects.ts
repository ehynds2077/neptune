import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  const projectExists = await knex.schema.hasTable("project");
  if (!projectExists) {
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
  }

  if (!(await knex.schema.hasColumn("list_item", "project_id"))) {
    await knex.schema.alterTable("list_item", (table) => {
      table.uuid("project_id").references("id").inTable("project");
    });
  }

  if (!(await knex.schema.hasColumn("list", "project_id"))) {
    await knex.schema.alterTable("list", (table) => {
      table.uuid("project_id").references("id").inTable("project");
    });
  }

  if (!(await knex.schema.hasColumn("list", "list_parent_id"))) {
    await knex.schema.alterTable("list", (table) => {
      table.uuid("list_parent_id").references("id").inTable("list");
    });
  }

  if (!(await knex.schema.hasColumn("list", "list_type"))) {
    await knex.schema.alterTable("list", (table) => {
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
  }

  await knex.schema.alterTable("list", (table) => {
    table.dropNullable("title");
  });

  await knex.schema.raw("ALTER TABLE list DROP CONSTRAINT list_check");

  await knex.schema.raw(
    "ALTER TABLE list ADD CHECK ((list_type <> 'PROJECT_SUPPORT' AND title IS NOT NULL) OR (project_id IS NOT NULL))"
  );
}

export async function down(knex: Knex): Promise<void> {}
