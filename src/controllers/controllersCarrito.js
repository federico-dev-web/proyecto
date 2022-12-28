import { Contenedor } from '../containers/entregableManejoDeArchivos.js';


////// CARRITO

/// Creando contenedor 
const carritos = new Contenedor('carritos')


//Devuelve todos los carritos
export const getCarritos = async (req, res) => {
    res.json( await carritos.getAll() )
}


//Crea un carrito y devuelve su id
export const newCarrito = async (req, res) => {
    let carritoAgregar = req.body
    carritoAgregar.timestamp = Date.now()
    await carritos.save(carritoAgregar)
    let carritoCreado = await carritos.getById(Object.keys( await carritos.getAll()).length)
    res.json( { "id del carrito nuevo": carritoCreado.id } )
}

//Vacía un carrito y lo elimina
export const deleteCarrito = async (req, res, err) => {
    let id = Number(req.params.id)
    if ( !(await carritos.getAll()).find(el => el.id == id) ) {
        res.json({ "error" : 'carrito no encontrado' })
    }
    await carritos.deleteById(id)
    res.json({"ok": 'carrito eliminado'})
}

//Me permite listar todos los productos guardados en el carrito
export const viewCarrito = async (req, res) => {
    let id = Number(req.params.id)
    let carrito = await carritos.getById( id )
    if ( !carrito ) {
        res.json({ "error" : 'carrito no encontrado' })
    }
    res.json( carrito.productos )    
}

//Para incorporar productos al carrito por su id de producto
export const addProdToCarrito = async (req, res) => {
    let idCarrito = Number(req.params.id1)
    let idProducto = Number(req.params.id2)
    if ( !(await carritos.getAll()).find(el => el.id == idCarrito) ) {
        res.json({ "error" : 'carrito no encontrado' })
    }
    if ( !(await productos.getAll()).find(el => el.id == idProducto) ) {
        res.json({ "error" : 'el producto no existe' })
    }
    if ( (await carritos.getAll()).find(el => el.id == idCarrito).productos.find(el => el.id == idProducto) ) {
        res.json({ "error" : 'el producto ya existe en el carrito' })
    }
    let carritoModificado = await carritos.getById( idCarrito )
    let alCarrito = await productos.getById( idProducto )
    carritoModificado.productos.push( alCarrito )
    await carritos.changeById( carritoModificado, idCarrito )
    res.json( {"ok": 'se agrego el producto al carrito'} )    
}

//Eliminar un producto del carrito por su id de carrito y de producto
export const removeProdFromCarrito = async (req, res) => {
    let idCarrito = Number(req.params.id)
    let idProducto = Number(req.params.id_prod)
    if ( !(await carritos.getAll()).find(el => el.id == idCarrito) ) {
        res.json({ "error" : 'carrito no encontrado' })
    }
    if ( !(await productos.getAll()).find(el => el.id == idProducto) ) {
        res.json({ "error" : 'el producto no existe' })
    }
    if ( !( (await carritos.getAll()).find(el => el.id == idCarrito).productos.find(el => el.id == idProducto)) ) {
        res.json({ "error" : 'el producto no existe en el carrito' })
    }
    let carritoModificado = await carritos.getById( idCarrito )
    carritoModificado.productos = carritoModificado.productos.filter(element => Number(element.id) !== idProducto)
    await carritos.changeById( carritoModificado, idCarrito )
    res.json( {"ok":'El producto fue quitado del carrito'} )    
}