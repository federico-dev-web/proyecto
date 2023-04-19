import mongoose from 'mongoose'

class carritoSessionDao {
    constructor(connString){
        this.connString = connString
        this.carritoSession = mongoose.model('carritoSession', new mongoose.Schema({
            username: {type: String},
            carritoID: {type: String}
        }))
    }

    static getInstance() {
        if(!instance) {
            instance =  new userPassDao()
        }
        return instance
    }

    async init() {
        await mongoose.connect( this.connString, {useNewUrlParser: true, useUnifiedTopology: true} )
    }

    async disconnect() {
        await this.init()
        await mongoose.disconnect()
    }
        
    //Crea el carrito
    async crearCarrito( carritoAgregar ) {
        await this.init()
        await this.carritoSession.create( [ carritoAgregar ] ) 
    }

    //Borra carrito
    async deleteCarrito( userid ) {
        await this.init()
        await this.carritoSession.deleteMany( { username: userid } )
    }

    //Obtengo el carrito actual del usuario logeado
    async getCurrentCarritoSession( userid ) {
        await this.init()
        let carritoSession = await this.carritoSession.find( { username:  userid } )
        return carritoSession
    } 
}


export default carritoSessionDao