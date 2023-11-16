const Product = require("../Models/productModel");
const ApiFeatures = require("../utils/ApiFeatures.js");
const cloudinary = require('cloudinary')

//Create Product--Admin
const createProduct =  async (req,res,next) => {
    // try {
        let images = []
        console.log('1')
        if(typeof req.body.images === "string"){
            images.push(req.body.images)
        } else {
            images = req.body.images
        }

        const imagesLink = []
        console.log('2')

        // try {
            for(let i=0; i <images.length; i++){
                const results = await cloudinary.v2.uploader.upload(
                images[i], {
                folder:"products"
                });
                 console.log('3')
    
                imagesLink.push({
                public_id:results.public_id,
                url:results.secure_url
                }
                )}  
        // } catch (error) {
            // console.log('ok')
        // }
        
        console.log('4')

        req.body.images = imagesLink;
        req.body.user = req.user.id
        const product = await Product.create(req.body);
        res.status(200).json({
            sucess:"true",
            product
        })

}
//Fetch product details
const getProduct = async(req,res)=>{
   try {
    const data = await Product.findById(req.params.id)
    if(!data){
        return res.status(500).json({
            sucess:false,
            Message: "product not found"
        })
    }
    res.status(200).json({
        sucess:"true",
        data
    })
   } catch (error) {
    console.log(error)
   }
}

// get all products + also search feature
const getAllProducts = async (req, res) => {
    const resultsPerPage = 6;
    const productCount = await Product.countDocuments();
    const keyword = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultsPerPage);
    const data = await keyword.query;
    res.status(200).json({
        sucess: true,
        data,
        productCount,
        resultsPerPage
    })
}
// get all admin products + also search feature
const getAdminProducts = async (req, res) => {
    const productCount = await Product.find();
    res.status(200).json({
        sucess: true,
        productCount
        
    })
}

//updating products 
const updateProduct = async (req,res) =>{
    let product = await Product.findById(req.params.id);
    if(!product){
        return res.status(500).json({
            sucess:false,
            Message: "product not found"
        })
    }

     let images = []

     if(typeof req.body.images === "string"){
        images.push(req.body.images)
     } else {
        images = req.body.images
     }

     if(product && product.images !== undefined){
        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.v2.uploader.destroy(product.images[i].public_id)            
        }
     }
     let imagesLink = []

     for (let i = 0; i < images.length; i++) {
      const result =  await cloudinary.v2.uploader.upload(images[i],
            {
                folder:"products"
            })
            
            imagesLink.push({
                public_id: result.public_id,
                url:result.secure_url
            })
        }

        req.body.images = imagesLink

    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
    new:true,
    runValidators:true,
    useFindandModify:true}
    )

    res.status(200).json({
        sucess:true,
        product
    })
}

//Deleting Products
const DeleteProduct = async(req,res)=>{
    const Data = await Product.findById(req.params.id)
    
    if(!Data){
        return res.status(500).json({
            sucess:false,
            message:"Product Not Found"
        })
    }

    for (let i = 0; i < Data.images.length; i++) {
        await cloudinary.v2.uploader.destroy(Data.images[i].public_id)
    }
    Data.deleteOne()
    
    res.status(200).json({
        sucess:true,
        Message:"User has been deleted"
    })
}

//create New Review or Update the review
const Review = async(req,res)=>{
    const {rating,comment,productID} = req.body
    const review ={ 
        user:req.user._id,
        name:req.user.name,
        rating:Number(rating),
        comment,
    }
    const product = await Product.findById(productID)
    
    const existingReviewIndex = product.reviews.findIndex(
        (data) => data.user._id.toString() === req.user._id.toString()
      );
    if (existingReviewIndex !== -1) {
        product.reviews[existingReviewIndex] = review;
    }
    else {
        product.reviews.push(review);
        product.numofReviews = product.reviews.length
    }
    let avg = 0;
    
    product.reviews.forEach(rev=>{    //calcuating rating of the rating of the product
        avg+=rev.rating 
    })

    product.ratings = avg/product.reviews.length

    await product.save({validateBeforeSave: false});
    res.status(200).json({
        sucess:true,
        message:"updated sucessfully"
    })
}

const getAllReviews = async(req,res)=>{
    if(req.query.id.length !== 24){
        return res.status(200).json({
            sucess:false,
            error:"ID INVALID"
        })
    }
    const product = await Product.findById(req.query.id)


    if(!product){
        return res.json({
            sucess:false,
            message:"Product not found"
        })
    }
    res.status(200).json({
        sucess:true,
        review:product.reviews 
    })
}


const DeleteReview = async(req,res)=>{
    const product = await Product.findById(req.query.productID)
    if(!product){
        return res.json({
            sucess:false,
            message:"Product not found"
        })
    }

    const reviews = product.reviews.filter((rev)=> rev._id.toString() !== req.query.id.toString())

    let avg = 0;
    
    reviews.forEach(rev=>{    //calcuating rating of the rating of the product
        avg+=rev.rating 
    })
    let ratings = 0

    if(reviews.length === 0 ){
        ratings = 0
    } else {   
        ratings = avg/reviews.length
    }
        const numofReviews = reviews.length

    await Product.findByIdAndUpdate(req.query.productID,{
        reviews,
        ratings, 
        numofReviews
    },{
        new:true,
        runValidators:true,
        useFindandModify : false
    })

    res.status(200).json({
        sucess:true,
        Message:"Done successfully"
    })
}

module.exports = {getAllProducts,createProduct,getAdminProducts,updateProduct,DeleteProduct
                 ,getProduct,Review,getAllReviews,DeleteReview} 