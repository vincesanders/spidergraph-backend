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
            tbl.string('notes',1000)
        })
        .createTable('axes', tbl => {
            tbl.increments()
            tbl.string('name')
                .notNullable()
            tbl.integer('index')
                .notNullable()
            tbl.integer('graphId')
                .notNullable()
                .references('id')
                .inTable('graphs')
        })
        .createTable('layers', tbl => {
            tbl.increments()
            tbl.string('name')
                .notNullable()
            tbl.integer('index')
                .notNullable()
            tbl.integer('graphId')
                .notNullable()
                .references('id')
                .inTable('graphs')
        })
        .createTable('data', tbl => {
            tbl.increments()
            tbl.float('value')
                .notNullable()
            tbl.integer('axisId')
                .notNullable()
                .references('id')
                .inTable('axes')
            tbl.integer('layerId')
                .notNullable()
                .references('id')
                .inTable('layers')
        })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('data')
        .dropTableIfExists('layers')
        .dropTableIfExists('axes')
        .dropTableIfExists('graphs')
        .dropTableIfExists('users');
};
