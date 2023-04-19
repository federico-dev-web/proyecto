import { Strategy as LocalStrategy } from 'passport-local'
import bcrypt from "bcrypt"
import { listarTodosLosUsuarios, insertarUsuario } from './servicesUserPass.js';
import { sendMailRegister } from './servicesPedido.js'
import { crearCarrito } from '../services/servicesCarritoSession.js'


export const registerStrategy = new LocalStrategy({
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
})

export const loginStrategy = new LocalStrategy(async (username, password, done) => {
    
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
})


export const deserializaerCallback = async (username, done) => {
    let usuarios = await listarTodosLosUsuarios()
    const usuario = usuarios.find(usuario => usuario.username == username)
    done(null, usuario)
}