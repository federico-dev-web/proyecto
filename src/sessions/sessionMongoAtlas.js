import mongoStore from 'connect-mongo'
import dotenv from "dotenv"


dotenv.config({path: '../configs/.env.local'})

const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }

const sessionMongo =  {
    store: mongoStore.create({
        mongoUrl: process.env.MongoAtlasUrl,
        mongoOptions: advancedOptions
    }),
    secret: 'shhhhhh',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 120000
    },
    rolling: true
}

export { sessionMongo }