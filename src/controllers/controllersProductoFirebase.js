import admin from "firebase-admin"
import dotenv from "dotenv"


////// PRODUCTOS

//// Conexion a firebase

dotenv.config({path: './src/configs/.env.local'})

const serviceAccount = {
    type: process.env.type,
    project_id: "proyectofinalbackend-32190",
    private_key_id: process.env.private_key_id,
    private_key: process.env.private_key,
    client_email: process.env.client_email,
    client_id: process.env.client_id,
    auth_uri: process.env.auth_uri,
    token_uri: process.env.token_uri,
    auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
    client_x509_cert_url: process.env.client_x509_cert_url
}

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()

const query = db.collection("productos")



//// Controladores


//devuelve todos los productos o un producto según su id
export const getProducts = async (req, res) => {
    //recibo listado de productos de db
    let productos = await query.get().then(res => res.docs ).then( docs => docs.map(d => d.data()))
    //verifica si no se solicitó id en la ruta y responde listado de todos los productos
    if( !req.params.id) {
        res.json( productos )
        return
    }
    //verifica si el id solicitado existe
    if ( !( productos.find( prod => prod.idStore == Number(req.params.id) ) ) ) {
        res.json({ "error" : 'producto no encontrado' })
        return
    }
    //respuesta para id valido
    res.json(productos.find( prod => prod.idStore == Number(req.params.id) ))
}


//recibe y agrega un producto, y lo devuelve con su id asignado
export const postProduct = async (req, res) => {
    //valida usuario admin
    if (!admin) {
        res.send({"error":'Solo los admin pueden cargar productos'})
    } else {
        //traigo listado de productos
        let productos = await query.get().then(res => res.docs ).then( docs => docs.map(d => d.data()))
        //arma objeto del nuevo producto
        let prodAgregar = req.body
        prodAgregar.timestamp = Date.now()
        prodAgregar.id = productos.length+1
        //se carga el producto en db
        await query.add( prodAgregar )
        res.json( prodAgregar )
    }
}

//recibe y actualiza un producto según su id
export const updateProduct =  async (req, res, err) => {
    //valida usuario admin
    if (!admin) {
        res.send({"error":'Solo los admin pueden cargar productos'})
    } else {
        //obtiene el id de firebase para modificar el documento
        let fireId = ''
        await query.where('idStore','==', Number(req.params.id) ).get().then( a => a.docs ).then(b => { fireId = b[0].id } ).catch(err=> err)
        //valida si el producto existe
        if ( ! fireId ) {
            res.json({ "error" : 'producto no encontrado' })
            return
        }
        //prepara el objeto para hacer la modificacion
        let obj = req.body
        obj.timestamp = Date.now()
        //manda modificacion a db
        await query.doc( fireId ).update( obj )
        res.json({"ok": 'producto actualizado'})
    }
}


//elimina un producto según su id
export const deleteProduct = async (req, res, err) => {
    //valida usuario admin
    if (!admin) {
        res.send({"error":'Solo los admin pueden eliminar productos'})
    } else {
        //obtiene el id de firebase para modificar el documento
        let fireId = ''
        await query.where('idStore','==', Number(req.params.id) ).get().then( a => a.docs ).then(b => { fireId = b[0].id } ).catch(err=> err)
        //valida si el producto existe
        if ( ! fireId ) {
            res.json({ "error" : 'producto no encontrado' })
            return
        }
        //prepara el objeto para hacer la modificacion
        let obj = req.body
        obj.timestamp = Date.now()
        //manda modificacion a db
        await query.doc( fireId ).delete()
        res.json({"ok": 'producto eliminado'})
    }
}



export const listProducts = async () => {
    //recibo listado de productos de db
    let productos = await query.get().then(res => res.docs ).then( docs => docs.map(d => d.data()))
    return productos
}