const Mongoose = require('mongoose')

const connectDB = () => {   
    Mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
        console.log("Database has been created")
    })
    .catch((error) => {
        console.error("Error connecting to the database:", error);
      });
    
}


module.exports = connectDB
