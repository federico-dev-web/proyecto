import twilio from "twilio"
import dotenv from 'dotenv'
import logger from "../loggers/logger.js";

dotenv.config({path: '../configs/.env.local'})

const  accountSid = 'AC26acaa4053074a649d834e04cc517b49'
const authToken = "805e01800df75d0c156b7fa7ec60f73d"

const client = twilio(accountSid, authToken)

export const sendWhatsapp = async (number,msj) => { 
    client.messages.create({
        body: `${msj}`,
        from: 'whatsapp:+14155238886',
        to: `whatsapp:${number}`
    }).then().catch ( err => { logger.error( `error mensajes: ${err}` ) })
}




