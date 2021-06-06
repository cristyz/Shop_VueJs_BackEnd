const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('./models/newUser')

// NewUserModel
const NewUser = mongoose.model("newuser")




// MiddleWares
    app.use(cors())
    app.use(express.urlencoded({extended: false})) 

const products = require('./products/products.json')

app.get('/', (req, res) => {
    res.send(products) 
})

app.post('/postNewUser', (req, res) => {
    const newUsuario = {
        name: req.body.name,
        password: req.body.pass
    }

    new NewUser(newUsuario).save().then(() => console.log('Usuario criado!')).catch(() => console.log('Erro em newUser!'))
})

// Mongo Connect
mongoose.connect('mongodb://localhost/shopapp')
    .then(() => {
        console.log('Success MongoDB');
    }).catch(() => {
        console.log('Error MongoDB');
    })

app.listen(8484, () => {
    console.log('Server Start!');
})