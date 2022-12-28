import { Router } from "express";
import { getProducts, postProduct, updateProduct, deleteProduct } from '../controllers/controllersProductoFirebase.js';


const routerApiProductos = new Router()


//devuelve todos los productos o un producto según su id
routerApiProductos.get('/:id?', getProducts )
//recibe y agrega un producto, y lo devuelve con su id asignado
routerApiProductos.post('/', postProduct )
//recibe y actualiza un producto según su id
routerApiProductos.put('/:id', updateProduct )
//elimina un producto según su id
routerApiProductos.delete('/:id', deleteProduct )


export { routerApiProductos }

