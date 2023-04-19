import carritoSessionRepo from "../persistency/repository/carritoSessionRepo.js"
import { newCarrito, viewCarrito } from "./servicesCarritos.js"

const carritoSession = new carritoSessionRepo()

export const crearCarrito = async (userid) => {
    await carritoSession.deleteCarrito( userid )
    //Creo el carrito nuevo en la base de carritos
    let info = await newCarrito()
    //creo el objeto para la base de carritos-usuarios
    let nuevoCarrito = {
        'username': userid,
        'carritoID': info[0]._id
    }
    await carritoSession.crearCarrito( nuevoCarrito )
}

//Obtengo el carrito actual del usuario logeado
export const getCurrentCarrito = async ( userid ) => {
    let carritoEnSession = await carritoSession.getCurrentCarritoSession( userid )
    let carritoActual = {}
    if (carritoEnSession.length) {
        carritoActual = (await viewCarrito( carritoEnSession[0].carritoID ) )
    }
    return carritoActual
}