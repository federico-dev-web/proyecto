import { Router } from "express";
import dotenv from 'dotenv'
import { sendWhatsapp } from '../controllers/controllerSmsAndWhatsapp.js'
import { sendMailPedido } from '../controllers/controllerEmail.js'
import { getUsuario } from '../controllers/controllersUserPass.js'
import { getCurrentCarrito } from '../controllers/controllersCarritoSession.js'


dotenv.config({path: '../configs/.env.local'})

const routerApiPedido = new Router()

const EMAIL_ADMIN = process.env.EMAIL_ACCOUNT
const WHATSAPP = process.env.WHATSAPP_NUMB

//Confirma pedido
routerApiPedido.post('/pedido', async (req, res) => { 
    //funciones mandar mail o sms o whatsapp
    if (await req.isAuthenticated()) {
        let carrito = await getCurrentCarrito( toString(req.user.username) )
        let usuario = await getUsuario(req.user.username)
        let wappMessage = await `
            'datos comprador': ${usuario.username}, ${usuario.nombre}
            'datos compra': ${carrito.productos}
            `
        await sendMailPedido(usuario, carrito)
        await sendWhatsapp(WHATSAPP, wappMessage)
        res.json( {"ok": `su compra está confirmada bajo el código: ${carrito._id}`} )
    } else {
        res.json( {"error": "debe iniciar sesion para confirmar su pedido"} )
    }
} )

export { routerApiPedido }