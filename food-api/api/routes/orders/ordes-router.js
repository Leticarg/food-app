const express = require('express');
const apiOrdersRouter = express.Router();

const knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: './dev.sqlite3'
    }
});

const endpoint = '/';

apiOrdersRouter.get(endpoint, function (req, res) {
    knex.select('*')
    .from('orders').then(orders => {
        res.json(orders);
    })
});

apiOrdersRouter.post(endpoint, (req, res) => {
    const orders = req.body;

    const deliveryTime = Math.floor(Math.random() * (60 - 30 + 1)) + 30; 
    orders.deliveryTime = deliveryTime;

    knex('orders')
        .insert( orders, ['orderId'])
        .then(() => {
            res.status(201).json({
                message: 'Pedido finalizado com sucesso.',
                deliveryTime: `${deliveryTime} minutos`
            });
        })
        .catch(err => res.status(500).json({ message: `Erro ao finalizar pedido: ${err.message}` }));
});

apiOrdersRouter.delete(endpoint + ':orderId', function (req, res) {
    knex('orders')
  .where('orderId', req.params.orderId)
  .del().then(() =>{
    res.status(204).json(`Pedido excluido com sucesso`);
  }).catch(err => res.status(500).json({message: `Erro ao excluir pedido: ${err.message}`}));
});

module.exports = apiOrdersRouter;
