import { Router } from "express";
import * as controllerProductos from '../controllers/controllersProductoFirebase.js';


const routerApiProductos = new Router()


//devuelve todos los productos o un producto según su id
routerApiProductos.get('/:id?', controllerProductos.getProducts )
//recibe y agrega un producto, y lo devuelve con su id asignado
routerApiProductos.post('/', controllerProductos.postProduct )
//recibe y actualiza un producto según su id
routerApiProductos.put('/:id', controllerProductos.updateProduct )
//elimina un producto según su id
routerApiProductos.delete('/:id', controllerProductos.deleteProduct )


export { routerApiProductos }

