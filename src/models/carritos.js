import mongoose from 'mongoose'

const carritosCollectionName = 'carritos'


const productoSchema = new mongoose.Schema({
        idStore: {type: Number},
        timestamp: {type: Number},
        nombre: {type: String},
        descripcion: {type: String},
        codigo: {type: String},
        foto: {type: String},
        precio: {type: Number},
        stock: {type: Number}
})

const carritosSchema = new mongoose.Schema({
    timestamp: {type: Number, required: true},
    productos: [productoSchema]
})

export const carritos = mongoose.model(carritosCollectionName, carritosSchema)