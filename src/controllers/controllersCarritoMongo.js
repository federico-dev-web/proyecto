import mongoose from "mongoose";
import * as models from "../models/carritos.js";
import { listProducts } from './controllersProductoFirebase.js';
import dotenv from "dotenv"

////// CARRITO

//Para iniciar la conexion

dotenv.config({path: '../configs/.env.local'})

const conexion = async () => { 
    const URL = process.env.MongoAtlasUrl
    await mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}

//Devuelve todos los carritos
export const getCarritos = async (req, res) => {
    await conexion()
    res.json( await models.carritos.find() )
    await mongoose.disconnect()
}

//Devuelve el carrito para la vista de "/Home"
export const getCarritosSession = async (idCarrito) => {
    await conexion()
    let info = await models.carritos.find( {_id:  idCarrito } ) 
    await mongoose.disconnect()
    return info
}


//Crea un carrito y devuelve su id
export const newCarrito = async (req, res) => {
    await conexion()
    let carritoAgregar = req.body
    carritoAgregar.timestamp = Date.now()
    let info = await models.carritos.insertMany( carritoAgregar )
    res.json( { "id del carrito nuevo": info[0]._id } )
    await mongoose.disconnect()
}

//Crea un carrito y devuelve su id
export const newCarritoLogin = async (req, res) => {
    let carritoAgregar = {}
    carritoAgregar.timestamp = Date.now()
    return await models.carritos.insertMany( carritoAgregar )
}

//Vacía un carrito y lo elimina
export const deleteCarrito = async (req, res, err) => {
    await conexion()
    let idCarrito = req.params.id
    //evalua si el id es valido
    if ( !(await mongoose.isValidObjectId(idCarrito)) )  {
        await mongoose.disconnect()
        res.json({"error" : 'carrito no encontrado'})
        return
    }
    //evalua si el id no existe en la db
    if ( !( ( await models.carritos.find( {_id:  idCarrito } ) ).length ) ) {
        await mongoose.disconnect()
        res.json({ "error" : 'carrito no encontrado' }) 
        return
    }
    //elimina el carrito
    await models.carritos.deleteOne( {_id: idCarrito } )
    res.json({"ok": 'carrito eliminado'})
    await mongoose.disconnect()
}

//Me permite listar todos los productos guardados en el carrito
export const viewCarrito = async (req, res) => {
    await conexion()
    let idCarrito = req.params.id
    //evalua si el id es valido
    if ( !(await mongoose.isValidObjectId(idCarrito)) )  {
        await mongoose.disconnect()
        res.json({"error" : 'carrito no encontrado'})
        return
    }
    //evalua si el id no existe en la db
    if ( !( ( await models.carritos.find( {_id:  idCarrito } ) ).length ) ) {
        await mongoose.disconnect()
        res.json({ "error" : 'carrito no encontrado' }) 
        return
    }
    let carrito = await models.carritos.find( {_id: idCarrito} )
    res.json( carrito[0].productos )   
    await mongoose.disconnect()
}

//Para incorporar productos al carrito por su id de producto
export const addProdToCarrito = async (req, res) => {
    await conexion()
    let idCarrito = req.params.id1
    //evalua si el id es valido
    if ( !(await mongoose.isValidObjectId(idCarrito)) )  {
        await mongoose.disconnect()
        res.json({"error" : 'carrito no encontrado'})
        return
    }
    if ( !( ( await models.carritos.find( {_id:  idCarrito } ) ).length ) ) {
        await mongoose.disconnect()
        res.json({ "error" : 'carrito no encontrado' }) 
        return
    }
    let idProducto = req.params.id2
    //evalua si el id es valido
/*     if ( !(await mongoose.isValidObjectId(idProducto)) )  {
        await mongoose.disconnect()
        res.json({"error" : 'el producto no existe'})
        return
    } */
    //Carga listado de productos y busca el del id seleccionado
    let productos =     JSON.parse(JSON.stringify( await listProducts() ) )
    let alCarrito = productos.find(el => el.idStore == Number(idProducto))
    //valida si el producto existe en la base de productos
    if ( !alCarrito ) {
        await mongoose.disconnect()
        res.json({ "error" : 'el producto no existe' })
        return
    }
    //Verifica si el producto esta en el carrito
    let carrito = JSON.parse(JSON.stringify( await models.carritos.findOne( {_id: idCarrito} ) ))
    if ( carrito.productos.find(el =>  el.idStore == Number(idProducto)) ) {
        await mongoose.disconnect()
        res.json({ "error" : 'el producto ya existe en el carrito' })
        return
    }
    //Guardado cambios en la db
    await models.carritos.updateOne( {_id: idCarrito}, {$push: {productos: alCarrito} } )
    res.json( {"ok": 'se agrego el producto al carrito'} )    
    await mongoose.disconnect()
}

//Eliminar un producto del carrito por su id de carrito y de producto
export const removeProdFromCarrito = async (req, res) => {
    await conexion()
    let idCarrito = req.params.id1
    //evalua si el id es valido
    if ( !(await mongoose.isValidObjectId(idCarrito)) )  {
        await mongoose.disconnect()
        res.json({"error" : 'carrito no encontrado'})
        return
    }
    if ( !( ( await models.carritos.find( {_id:  idCarrito } ) ).length ) ) {
        await mongoose.disconnect()
        res.json({ "error" : 'carrito no encontrado' }) 
        return
    }
    let idProducto = req.params.id_prod
        //evalua si el id es valido
    /*if ( !(await mongoose.isValidObjectId(idProducto)) )  {
        await mongoose.disconnect()
        res.json({"error" : 'el producto no existe'})
        return
    } */
    //Carga listado de productos y busca el del id seleccionado
    let productos =     JSON.parse(JSON.stringify( await listProducts() ) )
    let alCarrito = productos.find(el => el.idStore == Number(idProducto))
    //valida si el producto existe en la base de productos
    if ( !alCarrito ) {
        await mongoose.disconnect()
        res.json({ "error" : 'el producto no existe' })
        return
    }
    //Verifica si el producto esta en el carrito
    let carrito = JSON.parse(JSON.stringify( await models.carritos.findOne( {_id: idCarrito} ) ))
    if ( !(carrito.productos.find(el => el.idStore == Number(idProducto)))  ) {
        await mongoose.disconnect()
        res.json({ "error" : 'el producto no existe en el carrito' })
        return
    }
    //Guardado cambios en la db
    await models.carritos.updateOne( {_id: idCarrito}, {$pull: {productos: {idStore: Number(idProducto) } } } )
    res.json( {"ok":'El producto fue quitado del carrito'} )   
    await mongoose.disconnect()
}