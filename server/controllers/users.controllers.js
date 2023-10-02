const userModel = require("../models/Users.model.js");
const { createError } = require('../utils/error.js');

const createUser = async (req, res, next) => {
    const newUser = new userModel(
        req.body
    );
    try {
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch (err) {
        // res.status(500).json({ message: err.message }, err);
        next(err);
    }
}

const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await userModel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        next(err);
    }
}

const deleteUser = async (req, res, next) => {
    try {
        await userModel.findByIdAndDelete(
            req.params.id
        );
        res.status(200).json("User deleted successfully!");
    } catch (err) {
        next(err);
    }
}

const getUser = async (req, res, next) => {
    try {
        const user = await userModel.findById(
            req.params.id
        );
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
}

const getAllUsers = async (req, res, next) => {
    // const failed = true;
    // if (failed) {
    //     const error = createError(401, "User not authenticated");
    //     return next(error); // Pass the error to the next middleware
    // }

    try {
        const users = await userModel.find();
        res.status(200).json(users);
    } catch (err) {
        // res.status(500).json(err);
        // return next(err);
        next(err);
    }
}

module.exports = { createUser, updateUser, deleteUser, getUser, getAllUsers };
