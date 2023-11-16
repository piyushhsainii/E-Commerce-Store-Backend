const Mongoose = require('mongoose')

const connectDB = () => {   
    Mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
        console.log("Database has been created")
    })
    
}


module.exports = connectDB
