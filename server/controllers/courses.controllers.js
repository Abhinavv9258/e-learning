const courseModel = require("../models/Courses.model.js");
const { createError } = require('../utils/error.js');

const createCourse = async (req, res, next) => {
    try {
        let data = req.body;
        const { title } = req.body;
        const course = await courseModel.find({ title });
        if (course.length > 0) {
            return next(createError(403, "Course Already Present!"));
        }

        if (data.thumbnail) {
            data.thumbnail = JSON.stringify({ base64: data.thumbnail });
        }

        const newCourse = new courseModel({ ...data });
        const savedCourse = await newCourse.save();
        res.status(200).json(savedCourse);
    } catch (err) {
        next(err);
    }
}

const updateCourse = async (req, res, next) => {
    try {
        // const updatedCourse = await courseModel.findByIdAndUpdate(
        //     req.params.id,
        //     { $set: req.body },
        //     { new: true }
        // );
        // res.status(200).json(updatedCourse);
        const existingCourse = await courseModel.findById(req.params.id);

        if (!existingCourse) {
            return next(createError(404, "Course not found"));
        }

        const updatedData = { ...req.body };

        // Handle the 'thumbnail' field separately
        if (updatedData.thumbnail) {
            existingCourse.thumbnail = JSON.stringify({ base64: updatedData.thumbnail });
            delete updatedData.thumbnail;
        }

        // Update the rest of the course data
        Object.assign(existingCourse, updatedData);

        // Save the updated course
        const updatedCourse = await existingCourse.save();

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
