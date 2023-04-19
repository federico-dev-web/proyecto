import dotenv from "dotenv"
import productosDao from '../dao/productosDao.js'

dotenv.config({path: './src/configs/.env.local'})


//datos para conectar a firebase
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

export default class productosDaoFactory{
    static getDao() {
        const dao = new productosDao( serviceAccount )
        dao.init()
        return dao
    }
    static getInstance() {
        if(!instance) {
            instance =  new productosDaoFactory()
        }
        return instance
    }
}