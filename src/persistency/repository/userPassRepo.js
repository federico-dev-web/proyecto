import userPassDaoFactory from "../factory/userPassFactory.js";

export default class userPassRepo {
    dao

    constructor() {
        this.dao = userPassDaoFactory.getDao()
    }

    static getInstance() {
        if(!instance) {
            instance =  new userPassDaoFactory()
        }
        return instance
    }

    async insertarUsuario(user) {
        await this.dao.insertarUsuario( user )
    }

    async listarTodosLosUsuarios() {
        let res = await this.dao.listarTodosLosUsuarios()
        return ( res )
    }

    async getUsuario( user ) {
        let res = await this.dao.getUsuario( user )
        return ( res )
    }
}