import productosDaoFactory from "../factory/productosFactory.js";

export default class productosRepo {
    dao

    constructor() {
        this.dao = productosDaoFactory.getDao()
    }

    static getInstance() {
        if(!instance) {
            instance =  new productosDaoFactory()
        }
        return instance
    }

    //devuelve todos los productos
    async getProducts() {
        let productos = await this.dao.getProducts()
        return productos
    }

    //devuelve todos los productos
    async getProductsHome() {
        let productos = await this.dao.listProducts()
        return productos
    }
    

    //recibe y agrega un producto, y lo devuelve con su id asignado
    async postProduct( prodAgregar ) {
        await this.dao.postProduct( prodAgregar )
        return 
    }

    //recibe y agrega un producto, y lo devuelve con su id asignado
    async getFireId( idStore ) {
        let res = await this.dao.getFireId( idStore )
        return res
    }

    //recibe y actualiza un producto según su id
    async updateProduct( fireId, prod) {
            await this.dao.updateProduct( fireId, prod)
            return prod
    }

    //elimina un producto según su id
    async deleteProduct( fireId ) {
        //valida usuario admin
            await this.dao.deleteProduct( fireId )
            return
    }

    async listProducts() {
        //recibo listado de productos de db
        let productos = await this.dao.listProducts()
        return productos
    }
}