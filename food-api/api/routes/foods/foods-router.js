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
    let foodsBody = req.body.foods; 

    if (!foodsBody || !Array.isArray(foodsBody)) {
        return res.status(400).json({ message: 'Body inválido. Esperado um array de foods.' });
    }

    knex('foods')
        .insert(foodsBody, ['foodId']) 
        .then(foods => {
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

apiFoodsRouter.delete(endpoint + ':foodId', function (req, res) {
    knex('foods').where('foodId', req.params.foodId)
  .del().then(() =>{ res.status(204).json(`Food excluido com sucesso`);})
  .catch(err => res.status(500).json({message: `Erro ao excluir food: ${err.message}`}));
});


module.exports = apiFoodsRouter;