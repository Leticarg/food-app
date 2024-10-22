const express = require('express');
const apiRestaurantsRouter = express.Router();

const endpoint = '/';

const knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: './dev.sqlite3'
      }
})

apiRestaurantsRouter.get(endpoint, function (req, res) {
    knex.select('*')
    .from('restaurants').then(restaurants => {
        res.json(restaurants);
    })
});

apiRestaurantsRouter.post(endpoint, function(req, res) {
    knex('restaurants').insert(req.body, ['restaurantId'])
    .then(restaurants => {
      let id = restaurants[0].restaurantId;
      res.status(201).json({message: `Restaurant inserida com sucesso.`, id});
    })
    .catch(err => res.status(500).json({message: `Erro ao inserir restaurant: ${err.message}`}))
});

apiRestaurantsRouter.post(endpoint + "create-list", function(req, res) {
    let restaurantsBody = req.body.restaurants; // Acessa o array 'restaurants' do body

    // Verifica se o body contém o array 'restaurants'
    if (!restaurantsBody || !Array.isArray(restaurantsBody)) {
        return res.status(400).json({ message: 'Body inválido. Esperado um array de restaurantes.' });
    }

    // Usa o knex para inserir cada restaurante
    knex('restaurants')
        .insert(restaurantsBody, ['restaurantId']) // Insere todos os restaurantes e retorna os IDs
        .then(restaurants => {
            // Retorna os IDs dos restaurantes inseridos
            let ids = restaurants.map(r => r.restaurantId);
            res.status(201).json({ message: 'Restaurantes inseridos com sucesso.', ids });
        })
        .catch(err => {
            res.status(500).json({ message: `Erro ao inserir restaurantes: ${err.message}` });
        });
});

module.exports = apiRestaurantsRouter;