const express = require('express');
const apiFoodsRouter = express.Router();

const endpoint = '/';

const knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: './dev.sqlite3'
      }
})

apiFoodsRouter.get(endpoint, function (req, res) {
    knex.select('*')
    .from('foods').then(restaurants => {
        res.json(restaurants);
    })
});

apiFoodsRouter.post(endpoint, function(req, res) {
    knex('foods').insert(req.body, ['foodId'])
    .then(foods => {
      let id = foods[0].foodId;
      res.status(201).json({message: `Food inserida com sucesso.`, id});
    })
    .catch(err => res.status(500).json({message: `Erro ao inserir food: ${err.message}`}))
});

apiFoodsRouter.post(endpoint + "create-list", function(req, res) {
    let foodsBody = req.body.foods; // Acessa o array 'foods' do body

    // Verifica se o body contém o array 'restaurants'
    if (!foodsBody || !Array.isArray(foodsBody)) {
        return res.status(400).json({ message: 'Body inválido. Esperado um array de foods.' });
    }

    // Usa o knex para inserir cada restaurante
    knex('foods')
        .insert(foodsBody, ['foodId']) // Insere todos os restaurantes e retorna os IDs
        .then(foods => {
            // Retorna os IDs dos restaurantes inseridos
            let ids = foods.map(r => r.foodId);
            res.status(201).json({ message: 'foods inseridos com sucesso.', ids });
        })
        .catch(err => {
            res.status(500).json({ message: `Erro ao inserir foods: ${err.message}` });
        });
});

apiFoodsRouter.put(endpoint + ':foodId', function (req, res) {
    knex('foods').where('foodId', req.params.foodId).update(req.body, ['foodId'])
    .then(foods => {
      let id = foods[0].foodId;
      res.status(200).json({message: `Food alterada com sucesso.`, id});
    })
    .catch(err => res.status(500).json({message: `Erro ao inserir food: ${err.message}`}))
  });

module.exports = apiFoodsRouter;