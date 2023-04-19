import dotenv from "dotenv"
import carritoSessionDao from '../dao/carritoSessionDao.js'

dotenv.config({path: './src/configs/.env.local'})
const URL = process.env.MongoAtlasUrl

export default class carritoSessionFactory{
    static getDao() {
        const dao = new carritoSessionDao( URL )
        dao.init()
        return dao
    }
    static getInstance() {
        if(!instance) {
            instance =  new carritoSessionFactory()
        }
        return instance
    }
}