import admin from "firebase-admin"
import dotenv from "dotenv"



////// PRODUCTOS

//// Conexion a firebase

dotenv.config({path: './src/configs/.env.local'})



dotenv.config({path: '../configs/.env.local'})

console.log(1);

const conexion = async () => { 
    const URL = process.env.MongoAtlasUrl
    await mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}


console.log(1);
console.log(process.env.MongoAtlasUrl);

