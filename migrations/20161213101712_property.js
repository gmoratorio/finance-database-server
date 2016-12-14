exports.up = function(knex, Promise) {
    return knex.schema.createTable('property', (property) => {
        property.increments();
        property.text('address').notNullable();
        property.text('city').notNullable();
        property.text('state').notNullable();
        property.integer('zip');
        property.text('unit');
        property.decimal('rent').notNullable();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('property');
};
