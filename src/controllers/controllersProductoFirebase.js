import * as servicesProductos from "../services/servicesProductos.js"

//devuelve todos los productos o un producto según su id
export const getProducts = async (req, res) => {
    let respuesta = await servicesProductos.getProducts(req, res)
    res.json( respuesta )
}

//devuelve todos los productos o un producto según su id
export const getProductsHome = async (req, res) => {
    let respuesta = await servicesProductos.getProducts(req, res)
    return { ...respuesta }
}

//recibe y agrega un producto, y lo devuelve con su id asignado
export const postProduct = async (req, res) => {
    let respuesta = await servicesProductos.postProduct(req, res)
    res.json(respuesta)
}

//recibe y actualiza un producto según su id
export const updateProduct =  async (req, res, err) => {
    let respuesta = await servicesProductos.updateProduct(req, res, err)
    res.json( respuesta )
}


//elimina un producto según su id
export const deleteProduct = async (req, res, err) => {
    let respuesta = await servicesProductos.deleteProduct(req, res, err)
    res.json( respuesta )
}

export const listProducts = async () => {
    //recibo listado de productos de db
    let respuesta = await servicesProductos.listProducts()
    return respuesta
}