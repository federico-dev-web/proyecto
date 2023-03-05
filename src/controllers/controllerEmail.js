import { createTransport } from 'nodemailer';
import dotenv from 'dotenv';
import logger from "../loggers/logger.js";

dotenv.config({path: '../configs/.env.local'})

//--------------------configurando nodemailer----------------------//

const EMAIL_ACCOUNT = process.env.EMAIL_ACCOUNT
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

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