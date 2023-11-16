
require('dotenv').config({path:'../config/config.env'})
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const processPayments = async(req,res,next)=>{
    console.log('this is console.log')
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types:["card"],
            mode:"payment",
            line_items:[
                {
                    price_data:{
                        currency:"inr",
                        unit_amount:req.body.amount,
                        product_data:{
                            name:"MyStore"
                        }
                    },
                    quantity:req.body.quantity
                }
            ],
            mode:'payment',
            success_url:"http://localhost:5173/success",
            cancel_url:"http://localhost:5173/successa"
        })

        res.json({
            url:session.url
        })

    } catch (error) {
        res.status(500).json({
            error:error.message
        })
    }
}


const sendStripekey = async(req,res)=>{
    res.status(200).json({
        sucess:true,
        stripe_key:process.env.STRIPE_KEY,
        secret_key:process.env.STRIPE_SECRET_KEY 

    })
}

module.exports = {processPayments , sendStripekey} 