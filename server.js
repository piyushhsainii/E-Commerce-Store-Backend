const { config } = require('dotenv')
const {app} = require('./app')
const cloudinary = require('cloudinary')


// HANDLING uncaught exception
process.on("uncaughtException",(err)=>{
    console.log(err.message)
    process.exit(1)
})

if(process.env.NODE_ENV !== "PRODUCTION" ){
    config({path:'backend/config/config.env'}) 
}



cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUD_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

const server = app.listen(process.env.PORT,()=>{
    console.log(`Server has started on PORT ${process.env.PORT}`)
})
 
// Unhandled Promise Rejections
process.on("unhandledRejection",(err)=>{
    console.log(err.message)
    // server.close(()=>{
    //     process.exit(1);
    // });
}) 