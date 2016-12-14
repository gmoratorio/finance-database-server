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
          return knex.schema.createTable('tenant', (tenant)=>{
            tenant.increments();
            tenant.text('name').notNullable();
            tenant.integer('age');
            tenant.integer('house_id');
            tenant.foreign('house_id').references('house.id').onDelete(CASCADE);
          });
        });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('property');
};
