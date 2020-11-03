exports.up = function (knex) {
  return knex.schema.createTable("cars", (tbl) => {
    tbl.increments("id");

    tbl.string("name", 64).unique().notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("cars");
};
