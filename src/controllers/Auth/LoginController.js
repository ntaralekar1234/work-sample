const authHelpers = require('../../helpers/auth')

const login = async (req,res,next) => {

    try {
        const data = await authHelpers.login(req.body.email,req.body.password)
        res.send(data)
    } catch (error) {
        res.status(400).send(error)
    }
}

const logout = async (req,res,next) => {

    try {
        await authHelpers.logout(req)
        res.send({message:"successfully logged out"})
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {login,logout}

