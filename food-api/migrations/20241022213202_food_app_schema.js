/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
      .createTable('restaurants', table => {
        table.primary(['restaurantId']);
        table.increments('restaurantId');
        table.string('name', 200).unique().notNullable();
        table.integer('price').notNullable();
        table.string('image', 100);
      })
      .createTable('foods', table => {
        table.primary(['foodId']);
        table.increments('foodId');
        table.string('name', 200).unique().notNullable();
        table.integer('price').notNullable();
        table.string('time', 50);
        table.integer('delivery');
        table.string('image', 100);
        table.string('day');
      })
      .createTable('orders', table => {
        table.increments('orderId');
        table.integer('restaurantId').notNullable().references('restaurantId').inTable('restaurants');
        table.text('foods').notNullable(); 
        table.integer('deliveryTime').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('orders')
    .dropTableIfExists('restaurants')
    .dropTableIfExists('foods');
};
