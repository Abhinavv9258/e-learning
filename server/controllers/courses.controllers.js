const courseModel = require("../models/Courses.model.js");
const { createError } = require('../utils/error.js');

const createCourse = async (req, res, next) => {
    const newCourse = new courseModel(
        req.body
    );
    try {
        const savedCourse = await newCourse.save();
        res.status(200).json(savedCourse);
    } catch (err) {
        // res.status(500).json({ message: err.message }, err);
        next(err);
    }
}

const updateCourse = async (req, res, next) => {
    try {
        const updatedCourse = await courseModel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedCourse);
    } catch (err) {
        next(err);
    }
}

const deleteCourse = async (req, res, next) => {
    try {
        await courseModel.findByIdAndDelete(
            req.params.id
        );
        res.status(200).json("Course deleted successfully!");
    } catch (err) {
        next(err);
    }
}

const getCourse = async (req, res, next) => {
    try {
        const course = await courseModel.findById(
            req.params.id
        );
        res.status(200).json(course);
    } catch (err) {
        next(err);
    }
}

const getAllCourses = async (req, res, next) => {
    // const failed = true;
    // if (failed) {
    //     const error = createError(401, "Course not authenticated");
    //     return next(error); // Pass the error to the next middleware
    // }

    try {
        const courses = await courseModel.find();
        res.status(200).json(courses);
    } catch (err) {
        // res.status(500).json(err);
        // return next(err);
        next(err);
    }
}

module.exports = { createCourse, updateCourse, deleteCourse, getCourse, getAllCourses };
