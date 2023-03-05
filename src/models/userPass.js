import mongoose from 'mongoose'

const userPassCollectionName = 'usuariosycontrasenias'


const userPassSchema = new mongoose.Schema({
        username: {type: String},
        password: {type: String},
        nombre: {type: String},
        direccion: {type: String},
        edad: {type: Number},
        telefono: {type: Number},
        avatar: {type: String}
})


export const userPass = mongoose.model(userPassCollectionName, userPassSchema)