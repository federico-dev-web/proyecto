import mongoose from "mongoose";
import * as models from "../models/carritoSession.js";
import { newCarritoLogin, getCarritosSession } from "./controllersCarritoMongo.js"
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

//Crea el carrito cuando hay un login
export const crearCarrito = async (userid) => {
    await conexion()
    await models.carritoSession.deleteMany( { username: userid } )
    //Creo el carrito nuevo en la base de carritos
    let info = await newCarritoLogin()
    //creo el objeto para la base de carritos-usuarios
    let newCarritoSession = {
        'username': userid,
        'carritoID': info[0]._id
    }
    await models.carritoSession.create( [ newCarritoSession ]) 
    //await mongoose.disconnect()
}

//Obtengo el carrito actual del usuario logeado
export const getCurrentCarrito = async (userid) => {
    await conexion()
    let carritoSession = await models.carritoSession.find( {username:  userid } )
    let carritoActual = await getCarritosSession(carritoSession[0].carritoID)
    return carritoActual[0]
} 