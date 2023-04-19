import admin from "firebase-admin"
import { transformarADTO } from '../dto/productosDto.js'

class productosDao {
    constructor( serviceAccount ){
        this.serviceAccount = serviceAccount
        admin.initializeApp({ credential: admin.credential.cert(this.serviceAccount) });
        this.query = admin.firestore().collection("productos")
    }

    static getInstance() {
        if(!instance) {
            instance =  new userPassDao()
        }
        return instance
    }

    async init( ) {
    }

    //devuelve todos los productos
    async getProducts() {
        let productos = await this.query.get().then(res => res.docs ).then( docs => docs.map(d => d.data()))
        return transformarADTO(productos)
    }

    //recibe y agrega un producto, y lo devuelve con su id asignado
    async postProduct( prodAgregar ) {
        await this.query.add( prodAgregar )
        return 
    }

    //recibe y agrega un producto, y lo devuelve con su id asignado
    async getFireId( idStore ) {
        let fireId = ''
        await this.query.where('idStore','==', Number( idStore ) ).get().then( a => a.docs ).then(b => { fireId = b[0].id } ).catch(err=> err)
        return fireId
    }

    //recibe y actualiza un producto según su id
    async updateProduct( fireId, prod) {
            await this.query.doc( fireId ).update( prod )
            return transformarADTO(prod)
    }

    //elimina un producto según su id
    async deleteProduct( fireId ) {
        //valida usuario admin
            let res = await this.query.doc( fireId ).delete()
            return res
    }

    async listProducts() {
        //recibo listado de productos de db
        this.init()
        let productos = await this.query.get().then(res => res.docs ).then( docs => docs.map(d => d.data()))
        return transformarADTO(productos)
    }

}

export default productosDao