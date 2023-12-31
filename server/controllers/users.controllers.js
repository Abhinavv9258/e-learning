const userModel = require("../models/Users.model.js");
const courseModel = require("../models/Courses.model.js");
const { createError } = require('../utils/error.js');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');


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
            { expiresIn: '3h' }
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

        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!isPasswordCorrect) { return next(createError(400, "Wrong username or password!")); }

        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT,
            { expiresIn: '3h' }
        );

        // res.cookie("access_token", token, {
        //     httpOnly: true,
        //     // secure: process.env.NODE_ENV === "production",
        //     // sameSite: 'strict'
        // });

        const { password, isAdmin, ...otherDetails } = user._doc;
        res.cookie("access_token", token, {
            httpOnly: true,
        })
            .status(200)
            .send({ user: otherDetails, token });
        // res.status(200).send({ user: otherDetails, token });
    } catch (err) {
        next(err);
    }
};


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
};


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
};


const deleteUser = async (req, res, next) => {
    try {
        await userModel.findByIdAndDelete(
            req.params.id
        );
        res.status(200).json("User deleted successfully!");
    } catch (err) {
        next(err);
    }
};


const getUser = async (req, res, next) => {
    try {
        const user = await userModel.findById(
            req.params.id
        );
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};


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
};


const addCourse = async (req, res, next) => {
    const userId = req.params.id;
    const { courseId } = req.body;

    try {
        const user = await userModel.findById(userId);
        const course = await courseModel.findById(courseId);

        if (user && course) {
            const alreadyEnrolled = user.courseEnrolled.some(enrolledCourse => enrolledCourse.equals(course._id));
            if (alreadyEnrolled) {
                return next(createError(400, "Course already added to the user!"));
            }
            user.courseEnrolled.push(course);
            await user.save();
            res.status(200).json({ message: 'Course added to user successfully!' });
        } else {
            res.status(404).json({ error: 'User or course not found!' });
        }
    } catch (error) {
        // res.status(500).json({ error: 'Internal server error' });
        next(error);
    }
}

const checkCourse = async (req, res, next) => {
    const userId = req.params.id;
    const { courseId } = req.body;

    try {
        const user = await userModel.findById(userId);

        if (user) {

            const isCourseAdded = user.courseEnrolled.includes(courseId);

            if (isCourseAdded) {
                next(createError(200, "Course is already added!"))
                // res.status(200).json({ message: 'Course is already added' });
            } else {
                next(createError(404, "Course is not added!"))
                // res.status(404).json({ message: 'Course is not added' });
            }
        } else {
            next(createError(404, "User not found!"))
            // res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        next(error);
        // res.status(500).json({ error: 'Internal server error' });
    }
}

const enrolledCourse = async (req, res, next) => {
    const userId = req.params.id;

    try {
        const user = await userModel.findById(userId).populate('courseEnrolled');

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const enrolledCourseIds = user.courseEnrolled.map(course => course._id);

        res.status(200).json({ enrolledCourseIds });
    } catch (error) {
        console.error('Error fetching user enrolled courses:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports = { register, login, createUser, updateUser, deleteUser, getUser, getAllUsers, addCourse, checkCourse, enrolledCourse };