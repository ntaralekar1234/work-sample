const User = require('../models/user')
const getusers = async (req,res,next) => {

    try {
        const users = await User.find({user_role:2})
        if(!users)
        {
            res.status(404).send({'error' : 'no record found'})
        }
        res.send(users)
    } catch(error) {
        res.status(400).send(error)
    }
     
}

const usersdetails = async (req,res,next) => {

    try {
        const user = await User.findById(req.params.id)
        if(!user)
        {
            res.status(404).send({'error' : 'no record found'})
        }
        res.send(user)
    } catch(error) {
        res.status(400).send(error)
    }
     
}

const updatedetails = async (req,res,next) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','email','password','status']
    const isValidOperations = updates.every((update) =>  allowedUpdates.includes(update))

    if(!isValidOperations) {
        return res.status(400).send({error : 'Invalid updates!'})
    }
    try {
        const user = await User.findById(req.params.id)
        updates.forEach((update)=> user[update] = req.body[update])
        await user.save()
        if(!user){
            return res.status(404).send({error : 'Invalid user'})
        }
        res.send(user)
    } catch(error) {
        res.status(400).send(error)
    }
}

module.exports = {getusers,usersdetails,updatedetails}