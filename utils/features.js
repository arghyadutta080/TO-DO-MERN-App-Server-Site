const jwt = require('jsonwebtoken')

const sendCookie = (res, newUser) => {
    const token = jwt.sign({ user_id: newUser._id }, process.env.JWT_SECRET);

    res.status(201).cookie('token', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 10,
        sameSite: process.env.NODE_ENV == "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV == "Development" ? false : true
    }).json({
        success: true,
        message: "cookie send successfully"
    })
}

module.exports = sendCookie