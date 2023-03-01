const express = require('express');
const app = express();
const c = console.log;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { addMenu, getMenu, deleteMenu, updateMenu, getSingleMenu } = require('./Controller/Menu.controller');


mongoose.connect('mongodb+srv://jeeva:jeeva@cluster0.xhyevf2.mongodb.net/test', { useNewUrlParser: true }).then(() => c('MongoDB connected')).catch(err => c(err));

app.use(cors());
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.send('Hello World!');
});

//Food

app.post('/food/addFood', addMenu);
app.get('/food/getFood', getMenu);
app.delete('/food/deleteFood/:id', deleteMenu);
app.put('/food/updateFood/:id', updateMenu);
app.get('/food/getSingleFood/:id', getSingleMenu);

app.listen(3000, () => c('Server started on port 3000'));
