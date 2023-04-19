import dotenv from "dotenv"
import userPassDao from '../dao/userPassDao.js'

dotenv.config({path: '../configs/.env.local'})
const URL = process.env.MongoAtlasUrl

export default class userPassDaoFactory{
    static getDao() {
        const dao = new userPassDao( URL )
        dao.init()
        return dao
    }
    static getInstance() {
        if(!instance) {
            instance =  new userPassDaoFactory()
        }
        return instance
    }
}