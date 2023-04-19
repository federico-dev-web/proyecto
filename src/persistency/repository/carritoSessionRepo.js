import carritoSessionFactory from "../factory/carritoSessionFactory.js";

export default class carritoSessionRepo {
    dao

    constructor() {
        this.dao = carritoSessionFactory.getDao()
    }

    static getInstance() {
        if(!instance) {
            instance =  new carritoSessionFactory()
        }
        return instance
    }

    //Crea el carrito
    async crearCarrito( carritoAgregar ) {
        let resp = await this.dao.crearCarrito( carritoAgregar )
        return resp
    }

    //Borra carrito
    async deleteCarrito( userid ) {
        let resp = await this.dao.deleteCarrito( userid )
        return resp
    }

    //Obtengo el carrito actual del usuario logeado
    async getCurrentCarritoSession( userid ) {
        let resp = await this.dao.getCurrentCarritoSession( userid )
        return resp
    } 
}