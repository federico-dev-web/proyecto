import carritosRepo from "../persistency/repository/carritosRepo.js"
import { listProducts } from "./servicesProductos.js"

const carritos = new carritosRepo() 

/* // a revisar:
import { listProducts } from '../controllers/controllersProductoFirebase.js';
// a revisar - FIN
 */


//Devuelve todos los carritos
export const getCarritos = async () => {
    return ( await carritos.getCarritos() )
}

//Devuelve el carrito para la vista de "/Home"
export const getCarritosSession = async ( idCarrito ) => {
    return ( await carritos.getCarritosSession( idCarrito ) )
}

//Crea un carrito vacio
export const newCarrito = async () => {
    let carritoAgregar = {}
    carritoAgregar.timestamp = Date.now()
    return ( await carritos.newCarrito( carritoAgregar ) )
}

//Vacía un carrito y lo elimina
export const deleteCarrito = async ( idCarrito ) => {
    //evalua si el id es valido
    if ( !(await carritos.validateCarritoId( idCarrito ) ) )  {
        return ( {"error" : 'carrito no encontrado (val id)'} )
    }
    //evalua si el id no existe en la db
    if ( !(await carritos.findCarritoById( idCarrito )).length ) {
        return( { "error" : 'carrito no encontrado (id missing)' } ) 
    }
    //elimina el carrito
    await carritos.deleteCarrito( idCarrito )
    return( {"ok": 'carrito eliminado'} )
}

//Me permite listar todos los productos guardados en el carrito
export const viewCarrito = async ( idCarrito ) => {
    //evalua si el id es valido
    if ( !( await carritos.validateCarritoId( idCarrito ) ) )  {
        return ( {"error" : 'carrito no encontrado'} )
    }
    //evalua si el id no existe en la db
    if ( !(await carritos.findCarritoById( idCarrito )).length ) {
        return( { "error" : 'carrito no encontrado' } ) 
    }
    return ( carritos.viewCarrito( idCarrito ) )
}

//Para incorporar productos al carrito por su id de producto
export const addProdToCarrito = async ( idCarrito, idProducto ) => {
    //evalua si el id es valido
    if ( !( await carritos.validateCarritoId( idCarrito ) ) )  {
        return ( {"error" : 'carrito no encontrado'} )
    }
    //evalua si el id no existe en la db
    if ( !(await carritos.findCarritoById( idCarrito )).length ) {
        return( { "error" : 'carrito no encontrado' } ) 
    }
    //Carga listado de productos y busca el del id seleccionado
    let productos = JSON.parse(JSON.stringify( await listProducts() ) )
    let alCarrito = productos.find(el => el.idStore == Number( idProducto ))
    //valida si el producto existe en la base de productos
    if ( !alCarrito ) {
        return ( { "error" : 'el producto no existe' } )
    }
    //Verifica si el producto esta en el carrito
    let carrito = JSON.parse(JSON.stringify( await carritos.findCarritoById( idCarrito ) ))[0]
    if ( carrito.productos.find( el =>  el.idStore == Number(idProducto) ) ) {
        return ( { "error" : 'el producto ya existe en el carrito' } )
    }
    //Guardado cambios en la db
    await carritos.addProdToCarrito( idCarrito, alCarrito )
    return ( {"ok": 'se agrego el producto al carrito'} )    
}

//Eliminar un producto del carrito por su id de carrito y de producto
export const removeProdFromCarrito = async ( idCarrito, idProducto ) => {
    //evalua si el id es valido
    if ( !( await carritos.validateCarritoId( idCarrito ) ) )  {
        return ( {"error" : 'carrito no encontrado'} )
    }
    //evalua si el id no existe en la db
    if ( !(await carritos.findCarritoById( idCarrito )).length ) {
        return( { "error" : 'carrito no encontrado' } ) 
    }
    //Carga listado de productos y busca el del id seleccionado
    let productos = JSON.parse(JSON.stringify( await listProducts() ) )
    let alCarrito = productos.find(el => el.idStore == Number( idProducto ))
    //valida si el producto existe en la base de productos
    if ( !alCarrito ) {
        return ( { "error" : 'el producto no existe' } )
    }
    //Verifica si el producto esta en el carrito
    let carrito = JSON.parse(JSON.stringify( await carritos.findCarritoById( idCarrito ) ))[0]
    if ( !( carrito.productos.find(el => el.idStore == Number( idProducto )) )  ) {
        return ( { "error" : 'el producto no existe en el carrito' } )
    }
    //Guardado cambios en la db
    await carritos.removeProdFromCarrito( idCarrito, idProducto )
    return ( {"ok":'El producto fue quitado del carrito'} )   
}