const User = require('../models/user')


const login = async (email,password) => {
    const user = await User.findByCredentials(email,password)
    const token = await user.generateAuthToken()
    return {user,token}
    
}

const logout = async (req) => {
    req.user.tokens = '',
    await req.user.save()
}


module.exports = {login,logout}