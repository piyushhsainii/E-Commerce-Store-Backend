const express = require('express');
const cookie = require('cookie-parser')
const app = express()
const cors = require('cors')
 const bodyparser = require('body-parser')
 const fileUpload = require('express-fileupload') 
const morgan = require('morgan')
const { config } = require('dotenv')
const path = require('path')

 config({path:'config/config.env'}) 


app.use(express.json())
app.use(cookie())
// app.use(cors())
app.use(cors({
     credentials: true,
    //  origin: "http://127.0.0.1:5173", 
     origin: "https://my-store-e-commerce.vercel.app", 
    //  allowedHeaders: ["Content-Type", "Authorization", /* add other headers here */],
    }));
app.use(bodyparser.urlencoded({extended:true}))
app.use(fileUpload())
// app.use(morgan())

const connectingDB = require('./database/database.js') 

connectingDB() 
//Router imports
const product = require('./routes/products.js')
const user = require('./routes/user.js')
const order = require('./routes/order.js') 
const payment = require('./routes/payment.js')

app.use("/",product);
app.use('/',user)
app.use('/',order)
app.use('/',payment)

// app.use(express.static(path.join(__dirname,'../frontend/dist')))

app.get('/',(req,res)=>{
res.send('Welcome')
})

// app.get('*',(req,res)=>{
//     res.sendFile(path.resolve(__dirname,'../frontend/dist/index.html'))
// })

module.exports= { app }