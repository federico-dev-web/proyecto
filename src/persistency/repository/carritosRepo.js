import carritosFactory from "../factory/carritosFactory.js";

export default class carritosRepo {
    dao

    constructor() {
        this.dao = carritosFactory.getDao()
    }

    static getInstance() {
        if(!instance) {
            instance =  new carritosFactory()
        }
        return instance
    }

    async insertarUsuario(user) {
        await this.dao.insertarUsuario( user )
    }

    //Devuelve todos los carritos
    async getCarritos() {
        return( await this.dao.getCarritos() )
    }

    //Devuelve el carrito para la vista de "/Home"
    async getCarritosSession(idCarrito) {
        return( await this.dao.getCarritosSession() )
    }


    //Crea un carrito
    async newCarrito( carrito ) {
        return ( await this.dao.newCarrito() )
    }

    //Vacía un carrito y lo elimina
    async deleteCarrito( idCarrito ) {
        return ( await this.dao.deleteCarrito( idCarrito ) ) 
    }

    //Me permite listar todos los productos guardados en el carrito
    async viewCarrito( idCarrito ) {
        return ( await this.dao.viewCarrito( idCarrito ) )
    }

    //Para incorporar productos al carrito 
    async addProdToCarrito( idCarrito, producto ) {
        return ( await this.dao.addProdToCarrito( idCarrito, producto ) )
    }

    //Eliminar un producto del carrito por su id de carrito y de producto
    async removeProdFromCarrito( idCarrito, idProducto ) {
        return ( await this.dao.removeProdFromCarrito( idCarrito, idProducto ) )
    }

    //Valida si el id del carrito es válido
    async validateCarritoId( idCarrito ) {
        return ( await this.dao.validateCarritoId( idCarrito ) )
    }

    //Busca el carrito por id
    async findCarritoById( idCarrito ) {
        return ( await this.dao.findCarritoById( idCarrito ) )
    }
}