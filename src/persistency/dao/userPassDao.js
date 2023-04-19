import mongoose from 'mongoose'
import { transformarADTO } from '../dto/usuariosYContraseniasDto.js'

class userPassDao {
    constructor(connString){
        this.connString = connString
        this.usuarios = mongoose.model('usuariosycontrasenias', new mongoose.Schema({
            username: {type: String},
            password: {type: String},
            nombre: {type: String},
            direccion: {type: String},
            edad: {type: Number},
            telefono: {type: Number},
            avatar: {type: String}
        }))
    }

    static getInstance() {
        if(!instance) {
            instance =  new userPassDao()
        }
        return instance
    }

    async init() {
        await mongoose.connect( this.connString, {useNewUrlParser: true, useUnifiedTopology: true} )
    }

    async disconnect() {
        await this.init()
        await mongoose.disconnect()
    }

    //inserta un usuario
    async insertarUsuario( user ) {
        await this.init()
        await this.usuarios.create( [ user ])
    }

    //array de usuarios
    async listarTodosLosUsuarios() {
        await this.init()
        let res = await this.usuarios.find()
        return transformarADTO( res )
    }
    //Devuelve un usuario
    async getUsuario( usuario ) {
        await this.init()
        let res = await this.usuarios.find( { username: usuario } )
        return transformarADTO( res )
    }
}


export default userPassDao