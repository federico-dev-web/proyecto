import productosRepo from "../persistency/repository/productosRepo.js"

const productos = new productosRepo()

//variable para identificar los admin
const admin = true

//devuelve todos los productos o un producto según su id
export const getProducts = async (req, res) => {
    //recibo listado de productos de db
    let prods = await productos.getProducts()
    //verifica si no se solicitó id en la ruta y responde listado de todos los productos
    if (req.params.id) {
        //verifica si el id solicitado existe
        if ( !( prods.find( prod => prod.idStore == Number(req.params.id) ) ) ) {
            return { "error" : 'producto no encontrado' }
        }
        //respuesta para id valido
        return ( prods.find( prod => prod.idStore == Number(req.params.id) ) )
    }

    return prods

    
}

//devuelve todos los productos o un producto según su id
export const getProductsHome = async (req, res) => {
    //recibo listado de productos de db
    let prods = await productos.getProductsHome()
    return { ...prods }
}

//recibe y agrega un producto, y lo devuelve con su id asignado
export const postProduct = async (req, res) => {
    //valida usuario admin
    if (!admin) {
        return {"error":'Solo los admin pueden cargar productos'}
    } else {
        //traigo listado de productos
        let prods = await productos.getProducts()
        //arma objeto del nuevo producto
        let prodAgregar = req.body
        prodAgregar.timestamp = Date.now()
        prodAgregar.id = prods.length+1
        //se carga el producto en db
        await productos.postProduct( prodAgregar )
        return ( prodAgregar )
    }
}

//recibe y actualiza un producto según su id
export const updateProduct =  async (req, res, err) => {
    //valida usuario admin
    if (!admin) {
        return {"error":'Solo los admin pueden cargar productos'}
    } else {
        //obtiene el id de firebase para modificar el documento
        let fireId = ''
        fireId = await productos.getFireId( req.params.id )
        //valida si el producto existe
        if ( ! fireId ) {
            return { "error" : 'producto no encontrado' }
        }
        //prepara el objeto para hacer la modificacion
        let obj = req.body
        obj.timestamp = Date.now()
        //manda modificacion a db
        await productos.updateProduct( fireId, obj )
        return {"ok": 'producto actualizado'}
    }
}

//elimina un producto según su id
export const deleteProduct = async (req, res, err) => {
    //valida usuario admin
    if (!admin) {
        return {"error":'Solo los admin pueden eliminar productos'}
    } else {
        //obtiene el id de firebase para modificar el documento
        let fireId = ''
        fireId = await productos.getFireId( req.params.id )
        //valida si el producto existe
        if ( ! fireId ) {
            return { "error" : 'producto no encontrado' }
        }
        //manda modificacion a db
        await productos.deleteProduct( fireId )
        return {"ok": 'producto eliminado'} 
    }
}

export const listProducts = async () => {
    //recibo listado de productos de db
    let prods = await productos.listProducts()
    return prods
}