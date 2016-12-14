exports.up = function(knex, Promise) {
    return knex.schema.createTable('property', (property) => {
            property.increments();
            property.text('address').notNullable();
            property.text('city').notNullable();
            property.text('state').notNullable();
            property.integer('zip');
            property.text('unit');
            property.decimal('rent').notNullable();
        })
        .then(() => {
            return knex.schema.createTable('tenant', (tenant) => {
                tenant.increments();
                tenant.text('name').notNullable();
                tenant.integer('age');
                tenant.integer('property_id');
                tenant.foreign('property_id').references('property.id').onDelete('CASCADE');
            });
        })
        .then(() => {
            return knex.schema.createTable('payment', (tenant) => {
                tenant.increments();
                tenant.date('date');
                tenant.decimal('amount');
                tenant.text('comment');
                tenant.integer('tenant_id');
                tenant.foreign('tenant_id').references('tenant.id').onDelete('CASCADE');
            });
        });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('payment')
        .then(() => {
            return knex.schema.dropTableIfExists('tenant')
        })
        .then(() => {
            return knex.schema.dropTableIfExists('property')
        });

    // return knex.schema.dropTableIfExists('property');
};
