const userModel = require("../models/Users.model.js");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const { createError } = require("../utils/error.js");


const register = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new userModel({
            username: req.body.username,
            email: req.body.email,
            password: hash,
        });
        const savedUser = await newUser.save();
        console.log(savedUser);
        res.status(201).send("User has been registered!");
    } catch (err) {
        next(err);
    }
};


const login = async (req, res, next) => {
    try {
        const user = await userModel.findOne({ username: req.body.username });
        if (!user) return next(createError(404, "User not found!"));

        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!isPasswordCorrect)
            return next(createError(400, "Wrong username or password!"));

        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT
        );

        const { password, isAdmin, ...otherDetails } = user._doc;
        res
            .cookie("access_token", token, {
                httpOnly: true,
            })
            .status(200)
            .send({ ...otherDetails });
    } catch (err) {
        next(err);
    }
};


module.exports = { register, login };