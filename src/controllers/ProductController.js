const Product = require('../models/product')

const products = async (req,res,next) => {

    try {
        let products;
        console.log(req.user.user_role)
        if(req.user.user_role == 2)
        {
            products = await Product.find({user_id:req.user._id})
        }
        else
        {
            products = await Product.find() 
        }
        if(!products) res.status(404).send({error : 'No record found'})
        res.send(products)
    } catch(error) {
        res.status(400).send(error)
    }
     
}

const newproduct = async (req,res,next) => {
    const product = Product(req.body)
    product.user_id = req.user._id;
    try {
        await product.save()
        res.send(product)
    } catch(error) {
        if (error.name === "ValidationError") {
            let errors = {};
        
            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message;
            });
        
            return res.status(400).send(errors);
        }
        res.status(500).send(error)
    }
}

const updateproduct = async (req,res,next) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','price','status']
    const isValidOperations = updates.every((update) =>  allowedUpdates.includes(update))

    if(!isValidOperations) {
        return res.status(400).send({error : 'Invalid updates!'})
    }
    try {

        const product = await Product.findById(req.params.id)
        await product.save(req.body)
        if(!product){
            return res.status(404).send({error : 'Invalid Product'})
        }
        res.send(product)
    } catch(error) {
        res.status(400).send(error)
    }
}

const removeproduct = async (req,res,next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id)
        if(!product){
            return res.status(404).send({error : 'Invalid Product'})
        }
        res.send(product)
    } catch(error) {
        res.status(400).send(error)
    }
}

module.exports = {products,newproduct,updateproduct,removeproduct}
     
