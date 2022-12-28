import { Router } from "express";
import { getCarritos, newCarrito, deleteCarrito, viewCarrito, addProdToCarrito, removeProdFromCarrito } from '../controllers/controllersCarritoMongo.js';


const routerApiCarrito = new Router()


//Devuelve todos los carritos
routerApiCarrito.get('/', getCarritos )
//Crea un carrito y devuelve su id
routerApiCarrito.post('/', newCarrito )
//Vacía un carrito y lo elimina
routerApiCarrito.delete('/:id', deleteCarrito )
//Me permite listar todos los productos guardados en el carrito
routerApiCarrito.get('/:id/productos', viewCarrito )
//Para incorporar productos al carrito por su id de producto
routerApiCarrito.post('/:id1/productos/:id2', addProdToCarrito )
//Eliminar un producto del carrito por su id de carrito y de producto
routerApiCarrito.delete('/:id1/productos/:id_prod', removeProdFromCarrito )


export { routerApiCarrito }
