exports.seed = function(knex, Promise) {
    return knex.raw('DELETE FROM tenant; ALTER SEQUENCE tenant_id_seq restart with 8;')
        .then(() => {
            return knex('tenant').del()
                .then(() => {
                    return Promise.all([
                        knex('tenant').insert({
                            id: 1,
                            name: 'Justin Bryson',
                            property_id: 1
                        }),
                        knex('tenant').insert({
                            id: 2,
                            name: 'Jordan Ross',
                            property_id: 2
                        }),
                        knex('tenant').insert({
                            id: 3,
                            name: 'Randall Navarro',
                            property_id: 3
                        }),
                        knex('tenant').insert({
                            id: 4,
                            name: 'Lucy Wright',
                            property_id: 5
                        }),
                        knex('tenant').insert({
                            id: 5,
                            name: 'Michael Sexton',
                            property_id: 6
                        }),
                        knex('tenant').insert({
                            id: 6,
                            name: 'Guillermo Moratorio',
                            age: 31,
                            property_id: 4
                        }),
                        knex('tenant').insert({
                            id: 7,
                            name: 'Kendall Kravec',
                            age: 28,
                            property_id: 4
                        })
                    ]);
                });
        });

};
