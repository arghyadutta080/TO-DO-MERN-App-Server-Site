const jwt = require('jsonwebtoken')
const userModel = require('../models/userModel');

const isAuthenticate = async (req, res, next) => {
    try {
        // check authenticated or not

        const { token } = req.cookies;

        if (!token) {
            res.status(404).json({
                success: false,
                message: "Login First"
            })
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET)
        const user_id = decode.user_id;
        req.user = await userModel.findById(user_id)
        next()

        // check authenticated or not
    } catch (error) {
        console.log(error)
    }
}

module.exports = isAuthenticate;