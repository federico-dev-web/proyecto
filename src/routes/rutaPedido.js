import { Router } from "express";
import * as controllersPedido from "../controllers/controllersPedido.js"

const routerApiPedido = new Router()

//Confirma pedido
routerApiPedido.post('/pedido', controllersPedido.pedidoUsuario )

export { routerApiPedido }