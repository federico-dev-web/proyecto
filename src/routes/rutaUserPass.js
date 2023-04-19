import { Router } from "express";
import passport from 'passport'
import * as passportServices from '../services/servicePassport.js'
import * as controllersUser from '../controllers/controllersUserPass.js'
import * as controllersPedido from "../controllers/controllersPedido.js"


const routerApiUserPass = new Router()

//----------------------PASSPORT----------------------//
//strategies
passport.use('register', passportServices.registerStrategy )
passport.use('login', passportServices.loginStrategy )

//SERIALIZE
passport.serializeUser( (user, done) => { done(null, user.username) } )
passport.deserializeUser( passportServices.deserializaerCallback )

//------------------ RUTAS ----------------------//

//Loegin de usuario
routerApiUserPass.post('/login', passport.authenticate('login', { failureRedirect: '/api/fail-login', successRedirect: '/api/home' }) )

//Registro de usuario
routerApiUserPass.post('/register', passport.authenticate('register', { failureRedirect: '/api/fail-register', 
successRedirect: '/api/succesfull-register'}) )

//Fail login
routerApiUserPass.get('/fail-login', controllersUser.failLogin )

//Fail register
routerApiUserPass.get('/fail-register', controllersUser.failRegister )

//Loggeo exitoso
routerApiUserPass.get('/home', controllersUser.succesfullLogin )

//Registro exitoso
routerApiUserPass.get('/succesfull-register', controllersUser.succesfullRegister )

//Deslogeo
routerApiUserPass.get('/logout', controllersUser.logout )


export { routerApiUserPass }