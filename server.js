import express from 'express';
import { routerApiProductos } from './src/routes/rutaProducto.js';
import { routerApiCarrito } from './src/routes/rutaCarrito.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


// ------ Clase 36 - Passport - Bcrypt - Twillo
import passport from 'passport'
import { routerApiUserPass } from './src/routes/rutaUserPass.js';
import { routerApiPedido } from './src/routes/rutaPedido.js';
import { sessionMongo } from './src/sessions/sessionMongoAtlas.js'
import session from 'express-session'
import logger from "./src/loggers/logger.js"


//redefino el __dirname (debido al type: module)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//variable para identificar los admin (a modificarse en el futuro)
const admin = true


/////  Servidor

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/static', express.static(__dirname + '/public'))
app.use(session(sessionMongo))
app.use(passport.initialize())
app.use(passport.session())

const PORT = process.env.PORT || 8080

///// Routes

app.use('/api/productos', routerApiProductos)
app.use('/api/carrito', routerApiCarrito)
app.use('/api', routerApiUserPass)
app.use('/api', routerApiPedido)
//para todas las demas rutas
app.get("*", (req, res) => {
    logger.warn( `invalid route: ${req.headers.referer}` )
    res.json(  {"error":'la ruta no existe'} )
});


const server = app.listen(PORT, () => {
    logger.info(`Servidor http escuchando en el puerto ${server.address().port}`)
})


