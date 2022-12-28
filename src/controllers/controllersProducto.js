import { Contenedor } from '../containers/entregableManejoDeArchivos.js';


////// PRODUCTO

/// Creando contenedor 
export const productos = new Contenedor('productos')


//devuelve todos los productos o un producto según su id
export const getProducts = async (req, res) => {
    if(!req.params.id) {
        res.json(await productos.getAll())
    }
    let id = Number(req.params.id)
    if ( !(await productos.getAll()).find(el => el.id == id) ) {
        res.json({ "error" : 'producto no encontrado' })
    }
    res.json(await productos.getById( id ))    
}

//recibe y agrega un producto, y lo devuelve con su id asignado
export const postProduct = async (req, res) => {
    if (!admin) {
        res.send({"error":'Solo los admin pueden cargar productos'})
    } else {
        let prodAgregar = req.body
        prodAgregar.timestamp = Date.now()
        await productos.save(prodAgregar)
        res.json( await productos.getById(Object.keys( await productos.getAll()).length) )
    }
}

//recibe y actualiza un producto según su id
export const updateProduct =  async (req, res, err) => {
    if (!admin) {
        res.send({"error":'Solo los admin pueden cargar productos'})
    } else {
        let id = Number(req.params.id)
        if ( !(await productos.getAll()).find(el => el.id == id) ) {
            res.json({ "error" : 'producto no encontrado' })
        }
        let obj = req.body
        obj.id = id
        await productos.changeById(obj, id)
        res.json({"ok": 'producto actualizado'})
    }
}


//elimina un producto según su id
export const deleteProduct = async (req, res, err) => {
    let id = Number(req.params.id)
    if ( !(await productos.getAll()).find(el => el.id == id) ) {
        res.json({ "error" : 'producto no encontrado' })
    }
    await productos.deleteById(id)
    res.json({"ok": 'producto producto eliminado'})
}