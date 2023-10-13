const userModel = require("../models/Users.model.js");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const { createError } = require("../utils/error.js");

const register = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new userModel({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: hash,
            phone: req.body.phone,
            address: req.body.address,
            stream: req.body.stream,
        });

        await newUser.save();
        const user = await userModel.findOne({ username: req.body.username });

        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT,
            { expiresIn: '1h' }
        );

        res.cookie("access_token", token, {
            httpOnly: true,
            // secure: process.env.NODE_ENV === "production",
            // sameSite: 'strict'
        });

        const updatedUser = await userModel.findByIdAndUpdate(
            user._id,
            { $set: { tokens: [token] } },
            { new: true }
        );

        // Return the user object without the password field
        const userWithoutPassword = { ...updatedUser._doc };
        delete userWithoutPassword.password;
        res.status(201).send({ user: userWithoutPassword });
    } catch (err) {
        next(err);
    }
};


const login = async (req, res, next) => {
    try {
        const user = await userModel.findOne({ username: req.body.username });
        if (!user) { return next(createError(404, "User not found!")); }
        if (!user.isAdmin) { return next(createError(404, "You are not authorized!")); }

        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!isPasswordCorrect) { return next(createError(400, "Wrong username or password!")); }

        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT,
            { expiresIn: '1h' }
        );

        res.cookie("access_token", token, {
            httpOnly: true,
            // secure: process.env.NODE_ENV === "production",
            sameSite: 'strict'
        });
        
        const { password, ...otherDetails } = user._doc;
        // res.cookie("access_token", token, {
        //         httpOnly: true,
        //     })
        //     .status(200)
        //     .send({ user: otherDetails, token });
        res.status(200).send({ user: otherDetails, token });
    } catch (err) {
        next(err);
    }
};

const logout = async (req, res, next) => {
    // res.send("logout");
    // console.log(req.headers);
    // const cookieString = req.headers.cookie;
    // const cookies = cookieString.split('; '); // Split the cookie string into an array of individual cookies

    // // Find the cookie that starts with "access_token="
    // const accessTokenCookie = cookies.find(cookie => cookie.startsWith('access_token='));

    // if (!accessTokenCookie) {
    //     return null; // Access token cookie not found
    // }

    // // Split the access token cookie into key and value
    // const [key, value] = accessTokenCookie.split('=');

    // // Return the access token value (remove any leading or trailing spaces)
    // const accessToken = value.trim();
    // console.log(accessToken);
    try {
        req.userModel.tokens = [];
        // Save the user with the updated tokens array
        await req.userModel.save();
        // Clearing cookies
        res.clearCookie('access_token', { path: '/' });
        
        console.log('log cleared')
        res.status(201).json({ status: 201, message: 'Logout successful' });
        console.log('Logout successful');
    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).json({ status: 500, error: 'Internal server error' });
        // next();
    }
}

module.exports = { register, login, logout };