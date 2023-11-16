const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    shippingInfo:{
        address:{
            type:String,
            required:true
        },
        state:{
            type:String,
            required:true
        },
        country:{
            type:String,
            required:true
        },
        PinCode:{
            type:Number,
            required:true
        },
        phoneNo:{
            type:Number,
            required:true
        },
    },
    orderItems:[
        {
            name:{
                type:String,
                required:true
            },
            price:{
                type:String,
                required:true
            },
            quantity:{
                type:String,
                required:true
            },
            image:{
                type:String,
                required:true
            },
            product:{
                type:mongoose.Schema.ObjectId,
                ref:"Product",
                required:true
            },
        },
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    // paymentInfo:{ 
    //     id:{
    //         type:String,
    //         required:true
    //     },
    //     status:{
    //         type:String,
    //         required:true
    //     },
    // },
    paidAt:{
        type:Date,
        required:true
    },
    itemsprice:{
        type:String,
        default:0
    },
    taxPrice:{
        type:String,
        default:0
    },
    Shippingprice:{
        type:String,
        default:0
    },
    Totalprice:{
        type:String,
        default:0
    },
    orderStatus:{
        type:String,
        required:true, 
        default:"Processing"
    },
    deliveredAt: Date,
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model("Order",orderSchema)