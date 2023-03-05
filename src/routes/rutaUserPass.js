import { Router } from "express";
import { listarTodosLosUsuarios, insertarUsuario } from '../controllers/controllersUserPass.js';
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import bcrypt from "bcrypt"
import { sendMailRegister } from '../controllers/controllerEmail.js'
import { crearCarrito, getCurrentCarrito } from '../controllers/controllersCarritoSession.js'
import { getProductsHome } from '../controllers/controllersProductoFirebase.js'
import logger from "../loggers/logger.js";

const routerApiUserPass = new Router()

//--------------------inicio de passport----------------------//
//--------------------strategies----------------------//
passport.use('register', new LocalStrategy({
    passReqToCallback: true    
}, async (req, username, password, done) => {
    const { direccion } = req.body
    let usuarios = await listarTodosLosUsuarios()
    const usuario = usuarios.find(usuario => usuario.username == username)
    if (usuario) {
        return done(null, false)
    }
    //b-crypt genera el hash desde la contraseña enviada por el usuario
    let hashedPass = bcrypt.hashSync(password, 10)

    const newUser = {
        username: username,
        password: hashedPass,
        nombre: req.body.nombre,
        direccion: req.body.direccion,
        edad: req.body.edad,
        telefono: req.body.telefono,
        avatar: req.body.avatar
    }
    
    await insertarUsuario(newUser)
    await sendMailRegister(newUser)

    done(null, newUser)
}))

passport.use('login', new LocalStrategy(async (username, password, done) => {
    
    let usuarios = await listarTodosLosUsuarios()
    const usuario = usuarios.find(usuario => usuario.username == username)
    if (!usuario) {
        return done(null, false)
    }

    //b-crypt valida la contraseña
    let validPass = bcrypt.compareSync(password, usuario.password )

    if (!validPass) {
        return done(null, false)
    }

    await crearCarrito( toString(usuario) )
    return done(null, usuario)
}))

//-----------SERIALIZE---------------------------------//

passport.serializeUser((user, done) => {
    done(null, user.username)
})

passport.deserializeUser( async (username, done) => {
    let usuarios = await listarTodosLosUsuarios()
    const usuario = usuarios.find(usuario => usuario.username == username)
    done(null, usuario)
})

//------------------ fin de passport ----------------------//


//Loegin de usuario
routerApiUserPass.post('/login', passport.authenticate('login', { failureRedirect: '/api/fail-login', successRedirect: '/api/home' }) )

//Registro de usuario
routerApiUserPass.post('/register', passport.authenticate('register', { failureRedirect: '/api/fail-register', 
successRedirect: '/api/succesfull-register'}) )

//Fail login
routerApiUserPass.get('/fail-login', (req, res) => { res.json(  {"error":'no fue posible completar el login, verifique usuario y contraseña'} )  })

//Fail register
routerApiUserPass.get('/fail-register', (req, res) => { res.json(  {"error":'el usuario ya esta en uso'} )  })

//Loggeo exitoso
routerApiUserPass.get('/home', async (req, res) => { 
    if (await req.isAuthenticated()) {
        let carrito = await getCurrentCarrito( toString(req.user.username) )
        let productos = await getProductsHome()
        res.json(  {
            "ok":'sesion iniciada correctamente',
            'productos disponibles': productos,
            'su carrito': carrito
        } )  
    } else {
        res.json({"error": "Debe iniciar sesion para acceder a esta vista"})
    }

})

//Registro exitoso
routerApiUserPass.get('/succesfull-register', (req, res) => { res.json(  {"ok":'registro de usuario realizado correctamente'} )  })

routerApiUserPass.get('/logout', async (req, res) => { 
    if (await req.isAuthenticated()) {
        req.logout( err => {if (err) { logger.error( `error mensajes: ${err}` ) }} ) 
        res.json({"ok": "sesion cerrada correctamente"})
    } else {
        res.json({"error": "no hay una sesion abierta para deslogear"})
    }
} )


routerApiUserPass.get('/prueba', (req, res) => {   res.json({"coso": "coso"})   } )


export { routerApiUserPass }