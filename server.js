import express from 'express';
import { routerApiProductos } from './src/routes/rutaProducto.js';
import { routerApiCarrito } from './src/routes/rutaCarrito.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


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

const PORT = process.env.PORT || 8080

///// Routes

app.use('/api/productos', routerApiProductos)
app.use('/api/carrito', routerApiCarrito)
//para todas las demas rutas
app.get("*", (req, res) => {
    res.json(  {"error":'la ruta no existe'} )
});


const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})


