const Mongoose = require('mongoose')

const connectDB = () => {   
    Mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("Database has been created")
    })
    
}


module.exports = connectDB
