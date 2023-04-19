import { Router } from "express";
import * as controllersCarrito from '../controllers/controllersCarritoMongo.js';


const routerApiCarrito = new Router()


//Devuelve todos los carritos
routerApiCarrito.get('/', controllersCarrito.getCarritos )
//Crea un carrito y devuelve su id
routerApiCarrito.post('/', controllersCarrito.newCarrito )
//Vacía un carrito y lo elimina
routerApiCarrito.delete('/:id', controllersCarrito.deleteCarrito )
//Me permite listar todos los productos guardados en el carrito
routerApiCarrito.get('/:id/productos', controllersCarrito.viewCarrito )
//Para incorporar productos al carrito por su id de producto
routerApiCarrito.post('/:id1/productos/:id2', controllersCarrito.addProdToCarrito )
//Eliminar un producto del carrito por su id de carrito y de producto
routerApiCarrito.delete('/:id1/productos/:id_prod', controllersCarrito.removeProdFromCarrito )


export { routerApiCarrito }
