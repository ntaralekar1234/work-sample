
const User = require('../../models/user')

const register = async (req,res,next) => {

    const user = new User(req.body)
    user.user_role = '2';
    try {
        await user.save()

        res.send(user)
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

const adminregister = async (req,res,next) => {

    const user = new User(req.body)
    user.user_role = '1';
    try {
        await user.save()

        res.send(user)
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



module.exports = {register,adminregister}