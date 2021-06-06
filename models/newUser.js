const mongoose = require('mongoose')
const Schema = mongoose.Schema



const UsuariosSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
})

mongoose.model('newuser', UsuariosSchema)
