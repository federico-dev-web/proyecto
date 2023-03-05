import mongoose from 'mongoose'

const carritoSessionCollectionName = 'carritoSession'


const carritoSessionSchema = new mongoose.Schema({
        username: {type: String},
        carritoID: {type: String}
})


export const carritoSession = mongoose.model(carritoSessionCollectionName, carritoSessionSchema)