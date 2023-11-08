const express = require('express');
const courseRoutes = express.Router();
const {
      createCourse,
      updateCourse,
      deleteCourse,
      getCourse,
      getAllCourses
} = require('../controllers/courses.controllers.js')

const { verifyAdmin } = require('../utils/verifyToken.js')

//CREATE
courseRoutes.post("/", verifyAdmin, createCourse);

//UPDATE
courseRoutes.put("/:id", verifyAdmin, updateCourse);

//DELETE
courseRoutes.delete("/:id", verifyAdmin, deleteCourse);

//GET
courseRoutes.get("/:id", getCourse);

//GET ALL
courseRoutes.get("/", getAllCourses);

module.exports = { courseRoutes };