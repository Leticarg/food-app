// require('dotenv').config()
const express = require ('express');
const cors = require('cors');
const app = express()

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const restaurantsRouter = require('./api/routes/restaurants/restaurants-router')
const foodsRouter = require('./api/routes/foods/foods-router')

app.use('/api/v1/restaurants', restaurantsRouter)
app.use('/api/v1/foods', foodsRouter)
app.listen(3005);