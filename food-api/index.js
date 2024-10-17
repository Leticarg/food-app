const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors()); // Permitir requisições de qualquer origem
app.use(express.json());

let data = {
  restaurants: [
    { id: "1", name: "Salada e File de Tilápia", image: 'https://imgur.com/a/ol9mPyW.png' },
    { id: "2", name: "Bife de boi e fritas", image: "https://imgur.com/xslBqnn.png" },
    { id: "3", name: "Estrogonofe", image: "https://imgur.com/EYHuhdD.png"},
    { id: "4", name: "Tropeiro", image: "https://imgur.com/56GwVez.png"},
    { id: "5", name: "Macarrao Abolonhesa", image: "https://imgur.com/9C9qJvz.png"},
    { id: "6", name: "Feijoada", image: "https://imgur.com/b2jGteI.png"},
  ],
  
  foods: [
    { id: "1", name: "Salada e File de Tilápia", image:"https://imgur.com/a/ol9mPyW.png", price: 39.90, restaurantId: "1" },
    { id: "2", name: "Bife de boi e fritas",  image: "https://imgur.com/xslBqnn.png", price: 29, restaurantId: "6" },
    { id: "3", name: "Estrogonofe", image: "https://imgur.com/EYHuhdD.png", price: 40, restaurantId: "5" },
    { id: "4", name: "Tropeiro", image: "https://imgur.com/56GwVez.png", price: 36, restaurantId: "3" },
    { id: "5", name: "Macarrao Abolonhesa", image: "https://imgur.com/9C9qJvz.png", price: 20, restaurantId: "3" },
    { id: "6", name: "Feijoada", image: "https://imgur.com/b2jGteI.png", price: 20, restaurantId: "3" },
  ]
};

app.get('/restaurants', (req, res) => {
  res.json(data.restaurants);
});

app.get('/foods', (req, res) => {
  res.json(data.foods);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
