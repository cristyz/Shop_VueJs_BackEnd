const mongoose = require('mongoose')
const Schema = mongoose.Schema



const UsuariosSchema = new Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }
})

const User = mongoose.model('newuser', UsuariosSchema)

module.exports = User
