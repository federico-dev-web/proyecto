import * as servicesPedido from "../services/servicesPedido.js"
import { getCurrentCarrito } from '../services/servicesCarritoSession.js'
import { getUsuario } from '../services/servicesUserPass.js'


export const pedidoUsuario =  async (req, res) => { 
    if (await req.isAuthenticated()) {
        let carrito = await getCurrentCarrito( toString(req.user.username) )
        let usuario = await getUsuario( (req.user.username) )
        servicesPedido.sendPedido( carrito, usuario )
        res.json( {"ok": `su compra está confirmada bajo el código: ${carrito[0]._id}`} )
    } else {
        res.json( {"error": "debe iniciar sesion para confirmar su pedido"} )
    }
}
