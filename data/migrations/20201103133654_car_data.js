exports.up = function (knex) {
  return knex.schema.createTable("cars", (tbl) => {
    tbl.increments("id");

    tbl.string("make", 64).notNullable();
    tbl.string("VIN", 64).unique().notNullable();
    tbl.string("model", 64).notNullable();
    tbl.integer("mileage", 64).notNullable();
    tbl.string("transmission", 64);
    tbl.string("title", 64);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("cars");
};
