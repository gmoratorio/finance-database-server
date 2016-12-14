exports.seed = function(knex, Promise) {
    return knex.raw('DELETE FROM payment; ALTER SEQUENCE payment_id_seq restart with 13;')
        .then(() => {
            return knex('payment').del()
                .then(() => {
                    return Promise.all([
                        knex('payment').insert({
                            id: 1,
                            date: '01/01/01',
                            amount: 81500,
                            tenant_id: 1
                        }),
                        knex('payment').insert({
                            id: 2,
                            date: '02/01/01',
                            amount: 81500,
                            tenant_id: 1
                        }),
                        knex('payment').insert({
                            id: 3,
                            date: '03/01/01',
                            amount: 80000,
                            tenant_id: 1
                        }),
                        knex('payment').insert({
                            id: 4,
                            date: '02/01/01',
                            amount: 81500,
                            tenant_id: 2
                        }),
                        knex('payment').insert({
                            id: 5,
                            date: '03/01/01',
                            amount: 81500,
                            tenant_id: 2
                        }),
                        knex('payment').insert({
                            id: 6,
                            date: '04/01/01',
                            amount: 80000,
                            tenant_id: 2
                        }),
                        knex('payment').insert({
                            id: 7,
                            date: '03/01/01',
                            amount: 97500,
                            tenant_id: 3
                        }),
                        knex('payment').insert({
                            id: 8,
                            date: '04/01/01',
                            amount: 97500,
                            tenant_id: 3
                        }),
                        knex('payment').insert({
                            id: 9,
                            date: '12/01/00',
                            amount: 79500,
                            tenant_id: 4
                        }),
                        knex('payment').insert({
                            id: 10,
                            date: '01/01/01',
                            amount: 79500,
                            tenant_id: 4
                        }),
                        knex('payment').insert({
                            id: 11,
                            date: '02/01/01',
                            amount: 79500,
                            tenant_id: 4
                        }),
                        knex('payment').insert({
                            id: 12,
                            date: '04/01/01',
                            amount: 71500,
                            tenant_id: 5
                        })
                    ]);
                });
        });

};
