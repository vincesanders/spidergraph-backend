
exports.up = function(knex) {
    return knex.schema
        .createTable('users',tbl => {
            tbl.increments()
            tbl.string('username')
                .unique()
                .notNullable()
            tbl.string('password')
                .notNullable()
            tbl.string('email')
                .notNullable()
        })
        .createTable('graphs',tbl => {
            tbl.increments()
            tbl.string('name')
                .notNullable()
            tbl.integer('owner')
                .notNullable()
                .references('id')
                .inTable('users')
            tbl.integer('theme')
                .notNullable()
            tbl.float('scale')
                .notNullable()
        })
        .createTable('dataLabels', tbl => {
            tbl.increments()
            tbl.string('name')
                .notNullable()
            tbl.integer('graphId')
                .notNullable()
                .references('id')
                .inTable('graphs')
            tbl.boolean('isAxis')
                .notNullable()
        })
        .createTable('dataValues', tbl => {
            tbl.increments()
            tbl.float('value')
                .notNullable()
            tbl.integer('axisId')
                .notNullable()
                .references('id')
                .inTable('dataLabels')
            tbl.integer('layerId')
                .notNullable()
                .references('id')
                .inTable('dataLabels')
        })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('dataValues')
        .dropTableIfExists('dataLabels')
        .dropTableIfExists('graphs')
        .dropTableIfExists('users')
};
