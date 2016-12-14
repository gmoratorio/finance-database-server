exports.seed = function(knex, Promise) {
    return knex.raw('TRUNCATE property; ALTER SEQUENCE property_id_seq restart with 6;')
        .then(() => {
            return knex('property').del()
                .then(() => {
                    return Promise.all([
                        knex('property').insert({
                            id: 1,
                            address: '5260 Wyandot Street',
                            city: 'Denver',
                            state: 'CO',
                            zip: 80221,
                            unit: 'Guest Room 1',
                            rent: 80000
                        }),
                        knex('property').insert({
                            id: 2,
                            address: '5260 Wyandot Street',
                            city: 'Denver',
                            state: 'CO',
                            zip: 80221,
                            unit: 'Guest Room 2',
                            rent: 80000
                        }),
                        knex('property').insert({
                            id: 3,
                            address: '5260 Wyandot Street',
                            city: 'Denver',
                            state: 'CO',
                            zip: 80221,
                            unit: 'Master Bedroom',
                            rent: 97500
                        }),
                        knex('property').insert({
                            id: 4,
                            address: '3526 N Cascade Ave',
                            city: 'Colorado Springs',
                            state: 'CO',
                            zip: 80907,
                            unit: 'G5',
                            rent: 79500
                        }),
                        knex('property').insert({
                            id: 5,
                            address: '3526 N Cascade Ave',
                            city: 'Colorado Springs',
                            state: 'CO',
                            zip: 80907,
                            unit: 'D5',
                            rent: 71500
                        })
                    ]);
                });
        })

};
