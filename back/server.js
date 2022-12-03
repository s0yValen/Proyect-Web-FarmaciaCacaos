const app=require("./app")
const connectDatabase = require("./config/database");
const cloudinary= require("cloudinary")

//configurar un archivo file
if(process.env.NODE_ENV === "PRODUCTION") require("dotenv").config(({path: 'back/config/config.env'}))

//Configurar base de datos
connectDatabase();

//Configurar Cloudinary
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

//Llamemos al server
const server=app.listen(process.env.PORT, () => {
    console.log(`Servidor iniciado en el puerto: ${process.env.PORT} en modo: ${process.env.NODE_ENV}`)
})