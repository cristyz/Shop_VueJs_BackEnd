const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const jsw = require('jsonwebtoken')
// NewUserModel
const User = require('./models/newUser')




// MiddleWares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const products = require('./products/products.json')

app.get('/', (req, res) => {
    res.send(products)
})

app.post('/postNewUser', (req, res) => {
    const newUsuario = {
        name: req.body.name,
        password: req.body.pass
    }

    new User(newUsuario).save()
        .then(() => res.send('User created!'))
        .catch(() => res.send('Username already exists'))
})

app.post('/login', async (req, res) => {
    const name = req.body.name
    const pass = req.body.pass

    User.findOne({ name: name, password: pass }, (err, user) => {
        if (err) {
            return res.status(500).json('Server Error')
        }
        if (!user) {
            return res.status(401).json('Usuario não existe')
        }
        if (user) {
            let token = jsw.sign({ userId: user._id }, 'secretkey')
            return res.status(200).json({
                title: 'Logado',
                token: token
            })
        }
    })

})

app.get('/user', (req, res, next) => {
    let token = req.headers.token
    console.log(token);
    jsw.verify(token, 'secretkey', (err, decoded) => {
        if (err) {
            return res.status(401).json('Não Logado')
        }
        User.findOne({ _id: decoded.userId }, (err, user) => {
            if (err) {
                return console.log('err');
            }
            return res.status(200).json({
                title: 'User Logado!',
                user: {
                    name: user.name
                }
            })
        })
    })
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