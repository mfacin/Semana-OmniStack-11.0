exports.up = function(knex) {
    return knex.schema.createTable('incidents', table => {
        // chave primária
        table.increments()

        table.string('title').notNullable()
        table.string('description').notNullable()
        table.decimal('value').notNullable()
      
        // chave estrangeira
        table.string('ong_id').notNullable()

        // relacionamento
        table.foreign('ong_id').references('id').inTable('ongs')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('incidents')
};
