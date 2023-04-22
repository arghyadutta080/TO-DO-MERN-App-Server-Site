const express = require('express')
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sendCookie = require('../utils/features')



const getMyProfile = async (req, res, next) => {

    try {
        if (!req.user) {
            res.status(404).json({
                message: "Login First"
            })
        }
        res.status(201).json(user)
    } catch (error) {
        console.log(error)
    }
}



const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            res.status(404).json({
                success: false,
                message: "wrong Email"
            })
        }

        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
            res.status(404).json({
                success: false,
                message: "wrong Password"
            })
        }

        sendCookie(res, user);
    } catch (error) {
        console.log(error)
    }

}



const register = async (req, res, next) => {

    try {
        const { name, email, password } = req.body;
        const user = await userModel.findOne({ email })

        if (user) {
            res.status(404).json({
                success: false,
                message: "User already exist"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new userModel({ name: name, email: email, password: hashedPassword })
        await newUser.save()

        sendCookie(res, newUser);
    } catch (error) {
        console.log(error)
    }
}



const logout = async (req, res) => {
    res.cookie('token', '', {
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV == Development ? "lax" : "none",
        secure: process.env.NODE_ENV == Development ? false : true
    }).json({
        message: "logout"
    })
}

module.exports = { login, register, logout, getMyProfile };