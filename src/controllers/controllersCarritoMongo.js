import * as servicesCarritos from "../services/servicesCarritos.js"

//Devuelve todos los carritos
export const getCarritos = async (req, res) => {
    res.json( await servicesCarritos.getCarritos() )
}

//Devuelve el carrito para la vista de "/Home"
export const getCarritosSession = async ( idCarrito ) => {
    return ( await servicesCarritos.getCarritosSession( idCarrito ) )
}

//Crea un carrito y devuelve su id
export const newCarrito = async (req, res) => {
    let info = await servicesCarritos.newCarrito()
    res.json( { "id del carrito nuevo": info[0]._id } )
}

//Crea un carrito y devuelve su id
export const newCarritoLogin = async (req, res) => {
    return await servicesCarritos.newCarrito()
}

//Vacía un carrito y lo elimina
export const deleteCarrito = async (req, res, err) => {
    let idCarrito = req.params.id
    res.json( await servicesCarritos.deleteCarrito( idCarrito ) )
}

//Me permite listar todos los productos guardados en el carrito
export const viewCarrito = async (req, res) => {
    let idCarrito = req.params.id
    res.json( await servicesCarritos.viewCarrito( idCarrito ) )
}

//Para incorporar productos al carrito por su id de producto
export const addProdToCarrito = async (req, res) => {
    let idCarrito = req.params.id1
    let idProducto = req.params.id2
    res.json( await servicesCarritos.addProdToCarrito( idCarrito, idProducto ) )    
}

//Eliminar un producto del carrito por su id de carrito y de producto
export const removeProdFromCarrito = async (req, res) => {
    let idCarrito = req.params.id1
    let idProducto = req.params.id_prod
    res.json( await servicesCarritos.removeProdFromCarrito( idCarrito, idProducto ) )   
}