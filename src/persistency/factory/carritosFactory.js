import dotenv from "dotenv"
import carritosDao from '../dao/carritosDao.js'

dotenv.config({path: './src/configs/.env.local'})
const URL = process.env.MongoAtlasUrl

export default class carritosFactory{
    static getDao() {
        const dao = new carritosDao( URL )
        dao.init()
        return dao
    }
    static getInstance() {
        if(!instance) {
            instance =  new carritosFactory()
        }
        return instance
    }
}