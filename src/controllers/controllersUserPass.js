import {  getCurrentCarrito } from '../services/servicesCarritoSession.js'
import { getProductsHome } from '../services/servicesProductos.js'
import * as servicesUserPass from "../services/servicesUserPass.js"
import logger from "../loggers/logger.js"

//Devuelve todos los usuarios
export const listarTodosLosUsuarios = async (req, res) => {
    let info = await servicesUserPass.listarTodosLosUsuarios()
    return info
}

//Devuelve un usuario
export const getUsuario = async ( usuario ) => {
    let info = await servicesUserPass.getUsuario( usuario )
    return info[0]
}

//Inserta un usuario
export const insertarUsuario = async ( newUser ) => {
    let info = await servicesUserPass.insertarUsuario( newUser )
    return info
}

//inicio de sesion incorrecto
export const failLogin  = async (req, res) => { 
    res.json(  {"error":'no fue posible completar el login, verifique usuario y contraseña'} )  
}

//Registro de usuario no completado (ya existe)
export const failRegister  = async (req, res) => { 
    res.json(  {"error":'el usuario ya esta en uso'} )  
}

//Inicio de session exitoso
export const succesfullLogin  = async (req, res) => { 
    if (await req.isAuthenticated()) {
        let carrito = await getCurrentCarrito( toString(req.user.username) )
        let productos = await getProductsHome()
        res.json(  {
            "ok":'sesion iniciada correctamente',
            'su carrito': carrito,
            'productos disponibles': productos
        } )  
    } else {
        res.json({"error": "Debe iniciar sesion para acceder a esta vista"})
    }
}

//Registro de usuario exitoso
export const succesfullRegister = (req, res) => { 
    res.json(  {"ok":'registro de usuario realizado correctamente'} )  
}

//Cierre de una sesion
export const logout = async (req, res) => { 
    if (await req.isAuthenticated()) {
        req.session.destroy( err => { if (err) { logger.error( `error mensajes: ${err}` ) } } ) 
        res.json({"ok": "sesion cerrada correctamente"})
    } else {
        res.json({"error": "no hay una sesion abierta para deslogear"})
    }
} 