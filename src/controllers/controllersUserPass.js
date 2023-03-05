import mongoose from "mongoose";
import * as models from "../models/userPass.js";
import dotenv from "dotenv"


////// CARRITO

//Para iniciar la conexion

dotenv.config({path: '../configs/.env.local'})

const conexion = async () => { 
    const URL = process.env.MongoAtlasUrl
    await mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}

//Devuelve todos los usuarios
export const listarTodosLosUsuarios = async (req, res) => {
    await conexion()
    let info = await models.userPass.find()
    //await mongoose.disconnect()
    return info
}

//Devuelve un usuario
export const getUsuario = async ( usuario ) => {
    await conexion()
    let info = await models.userPass.find( { username: usuario } )
    //await mongoose.disconnect()
    return info[0]
}

//Inserta un usuario
export const insertarUsuario = async ( newUser) => {
    await conexion()
    let info = await models.userPass.create( [ newUser ]) 
    //await mongoose.disconnect()
    return info
}