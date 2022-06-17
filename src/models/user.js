const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        required   : true,
        trim:true
    },
    email : {
        type : String,
        required : true,
        trim:true,
        lowercase:true,
        unique : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    password : {
        type : String,
        required : true,
        trim:true,
        min:6,
        validate(value){

            if(value.toLowerCase().includes('password')){
                throw new Error('Password cannot contain "Password"')
            }
        }

    },
    tokens : {
        type : String
    },
    user_role : {
        type : Number,
        required : true
    }
},{
    timestamps:true
})

UserSchema.methods.toJSON = function() {
    const user = this

    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    return userObject
}

UserSchema.methods.generateAuthToken =  async function () {
    const user = this

    const token = jwt.sign({_id : user._id.toString()},'pronode')
    user.tokens =  token
    await user.save()
    return token
}

UserSchema.statics.findByCredentials = async (email,password) => {

    const user = await User.findOne({email})

    if(!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password,user.password)

    if(!isMatch){
        throw new Error('Unable to login')
    }

    return user
}

UserSchema.pre('save', async function(next){

    const user = this
    
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }
    next()
})

const User = mongoose.model('User', UserSchema)

module.exports = User