import mongoose from 'mongoose'
import { transformarADTO } from '../dto/carritosDto.js'

class carritosDao {
    constructor(connString){
        this.connString = connString
        this.carritos = mongoose.model('carritos', new mongoose.Schema({
            timestamp: {type: Number},
            productos: [ {
                idStore: {type: Number},
                timestamp: {type: Number},
                nombre: {type: String},
                descripcion: {type: String},
                codigo: {type: String},
                foto: {type: String},
                precio: {type: Number},
                stock: {type: Number}
            } ]
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

    //Devuelve todos los carritos
    async getCarritos() {
        await this.init()
        return( await this.carritos.find() ) 
    }

    //Devuelve el carrito para la vista de "/Home"
    async getCarritosSession(idCarrito) {
        await this.init()
        let res =  await this.carritos.find( {_id:  idCarrito } ) 
        return( res )
    }


    //Crea un carrito
    async newCarrito( carrito ) {
        await this.init()
        return ( await this.carritos.insertMany( carrito ) )
    }

    //Vacía un carrito y lo elimina
    async deleteCarrito( idCarrito ) {
        await this.init()
        return ( await this.carritos.deleteOne( {_id: idCarrito } ) )
    }

    //Me permite listar todos los productos guardados en el carrito
    async viewCarrito( idCarrito ) {
        await this.init()
        return( await this.carritos.find( {_id: idCarrito} ) ) 
    }

    //Para incorporar productos al carrito 
    async addProdToCarrito( idCarrito, producto ) {
        await this.init()
        return ( await this.carritos.updateOne( {_id: idCarrito}, {$push: {productos: producto} } ) )
    }

    //Eliminar un producto del carrito por su id de carrito y de producto
    async removeProdFromCarrito( idCarrito, idProducto ) {
        await this.init()
        return ( await this.carritos.updateOne( {_id: idCarrito}, {$pull: {productos: {idStore: Number(idProducto) } } } ) )
    }

    //Valida si el id del carrito es válido
    async validateCarritoId( idCarrito ) {
        return ( mongoose.isValidObjectId(idCarrito) )
    }

    //Busca el carrito por id
    async findCarritoById( idCarrito ) {
        return (  await this.carritos.find( {_id: idCarrito} ) ) 
    }
}


export default carritosDao