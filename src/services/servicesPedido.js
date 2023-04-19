import twilio from "twilio"
import { createTransport } from 'nodemailer';
import dotenv from 'dotenv'
import logger from "../loggers/logger.js";



dotenv.config({path: './src/configs/.env.local'})


//--------------------configurando Twilio----------------------//


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



//--------------------configurando nodemailer----------------------//


const EMAIL_ACCOUNT = process.env.EMAIL_ACCOUNT
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;


dotenv.config({path: '../configs/.env.local'})

const EMAIL_ADMIN = process.env.EMAIL_ACCOUNT
const WHATSAPP = process.env.WHATSAPP_NUMB

const transporter = createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: EMAIL_ACCOUNT,
        pass: EMAIL_PASSWORD
    }
});

export const sendMailRegister = async (obj) => { 
    const mailOptions = {
        from: 'Proy. Final 32190 <newregister@backend.com>',
        to: EMAIL_ACCOUNT,
        subject: 'nuevo registro',
        text: `Nuevo usuario registrado: \n
        username = ${obj.username}\n
        password = ${obj.password}\n
        mail = ${obj.email}\n
        nombre = ${obj.nombre}\n
        direccion = ${obj.direccion}\n
        edad = ${obj.edad}\n
        telefono = ${obj.telefono}\n
        avatar = ${obj.avatar}
        `,
        html: `Nuevo usuario registrado: <br>
        username = ${obj.username}<br>
        password = ${obj.password}<br>
        mail = ${obj.email}<br>
        nombre = ${obj.nombre}<br>
        direccion = ${obj.direccion}<br>
        edad = ${obj.edad}<br>
        telefono = ${obj.telefono}<br>
        avatar = ${obj.avatar}
        `
    }

    try {
        const info = await transporter.sendMail(mailOptions);
    } catch (error) {
        logger.error( `error mensajes: ${error}` )
    }
}

//--------------------configurando pedido----------------------//



export const sendMailPedido = async (destinatario, carrito) => { 
    const mailOptions = {
        from: 'compra <pedidoconfirmado@backend.com>',
        to: destinatario.username,
        subject: `nuevo pedido de ${destinatario.nombre} - ${destinatario.username}`,
        text: `Contenido de la compra:
        ${carrito.productos}
        `,
        html: `Contenido de la compra: <br>
        ${carrito.productos}
        `
    }
    
    try {
        const info = await transporter.sendMail(mailOptions);
    } catch (error) {
        logger.error( `error mensajes: ${error}` )
    }
}


//--------------------enviar pedido----------------------//

export const sendPedido = async ( carrito, usuario ) => { 
    let wappMessage = await `
        'datos comprador': ${usuario.username}, ${usuario.nombre}
        'datos compra': ${carrito.productos}
        `
    await sendMailPedido(usuario, carrito)
    await sendWhatsapp(WHATSAPP, wappMessage)
    return carrito._id
}
