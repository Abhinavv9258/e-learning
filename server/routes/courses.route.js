// const express = require("express");
// const courseModel = require("../models/Courses.model");
// // const { auth } = require("../middlewares/users.middleware");
// const courseRoute = express.Router();
//
// courseRoute.post('/add', async (req, res) => {
//     try{
//           const { title, adminUsername } = req.body;
//           const course = await courseModel.find({ title, adminUsername });
//           if (course.length) {
//                 res.status(403).json({ message: "Course Already Present" });
//           } else {
//                 let data = req.body;
//                 data.thumbnail = JSON.stringify({base64:data.thumbnail});
//                 const newCourse = new courseModel({...data,admin:req.body.adminUsername});
//                 await newCourse.save();
//                 res.status(201).json({ message: "Course Added", data: newCourse });
//           } 
//         } catch (error) {
//         res.status(500).json({ message: "Something Went Wrong..!!", error: error.message });
//     }
//     // const data = new userModel(course);
//     // try{
//     //     await data.save();
//     //     res.json(data);
//     // }catch(error){
//     //     res.status(500).send(error);
//     // }
// });
//
// courseRoute.get('/all', async (req, res) => {
//
// });
//
//
//
// // courseRoute.get("/all", async (req, res) => {
// //   try {
// //     let { q, sortBy, sortOrder, page, limit } = req.query;
// //     let filter = {};
// //     if (q) {
// //       filter.title = { $regex: q, $options: "i" };
// //     }
// //     const sort = {};
// //     if (sortBy) {
// //       sort[sortBy] = sortOrder === "desc" ? -1 : 1;
// //     }
// //     page = page ? page : 1;
// //     limit = limit ? limit : 10;
// //     // console.log(filter,sort)
// //     const data = req.body;
// //     const course = await courseModel
// //       .find(filter)
// //       .sort(sort)
// //       .skip((page - 1) * limit)
// //       .limit(limit);
// //     res.status(200).json({ course });
// //   } catch (err) {
// //     res
// //       .status(400)
// //       .json({ message: "Something Went Wrong", error: err.message });
// //   }
// // });
//
//
// // // courseRoute.use(auth);
// // // Protected Routes
//
//
// // // get request for all courses
// // // EndPoint: /courses/
// // //FRONTEND: we can get the list of all course
//
// // courseRoute.get("/", async (req, res) => {
// //   try {
// //     let { q, sortBy, sortOrder, page, limit } = req.query;
// //     let filter = {};
// //     if (q) {
// //       filter.title = { $regex: q, $options: "i" };
// //     }
// //     const sort = {};
// //     if (sortBy) {
// //       sort[sortBy] = sortOrder === "desc" ? -1 : 1;
// //     }
// //     page = page ? page : 1;
// //     limit = limit ? limit : 10;
// //     // console.log(filter,sort)
// //     const data = req.body;
// //     const course = await courseModel
// //       .find(filter)
// //       .sort(sort)
// //       .skip((page - 1) * limit)
// //       .limit(limit);
// //     res.status(200).json({ course });
// //   } catch (err) {
// //     res
// //       .status(400)
// //       .json({ message: "Something Went Wrong", error: err.message });
// //   }
// // });
//
// // // get request indivual course
// // // EndPoint: /courses/:courseID
// // // FRONTEND: when user or admin want to access a specific course
// // courseRoute.get("/:courseID", async (req, res) => {
// //   try {
// //     const courseID = req.params.courseID;
// //     //console.log(courseID)
// //     const course = await courseModel.find({ _id: courseID });
// //     res.status(200).json({ course });
// //   } catch (err) {
// //     res
// //       .status(400)
// //       .json({ message: "Something Went Wrong", error: err.message });
// //   }
// // });
//
// // // adding new course
// // // Access: Admin & teacher
// // // EndPoint: /courses/add;
// // // FRONTEND: when teacher want to add his/ her new course
// // courseRoute.post("/add", async (req, res) => {
// //   try {
// //     if (req.body.role == "admin" || req.body.role == "teacher") {
// //       const { title, teacher } = req.body;
// //       const course = await courseModel.find({ title, teacher });
// //       //console.log(course)
// //       if (course.length) {
// //         res.status(403).json({ message: "Course Already Present" });
// //       } else {
// //         let data = req.body
// //         const newCourse = new courseModel({...data,teacher:req.body.username,teacherId:req.body.userId});
// //         await newCourse.save();
// //         res.status(201).json({ message: "Course Added", data: newCourse });
// //       }
// //     } else {
// //       res.status(401).json({ error: "you don't have access to add course" });
// //     }
// //   } catch (err) {
// //     res
// //       .status(400)
// //       .json({ message: "Something Went Wrong", error: err.message });
// //   }
// // });
//
// // // updating course details;
// // // Access: Admin & teacher;
// // // EndPoint: /courses/update/:courseID;
// // // FRONTEND: when teacher want to update his existing course
// // courseRoute.patch("/update/:courseID", async (req, res) => {
// //   try {
// //     if (req.body.role == "admin" || req.body.role == "teacher") {
// //       const courseID = req.params.courseID;
// //       const course = await courseModel.findByIdAndUpdate(
// //         { _id: courseID },
// //         req.body
// //       );
// //       //  console.log(course)
// //       if (!course) {
// //         res.status(404).json({ message: "course not found" });
// //       } else {
// //         res.status(202).json({ message: "course updated", course });
// //       }
// //     } else {
// //       res.status(401).json({ error: "you don't have access to update course" });
// //     }
// //   } catch (err) {
// //     res
// //       .status(400)
// //       .json({ message: "Something Went Wrong", error: err.message });
// //   }
// // });
//
// // // course delete request;
// // // Access: Admin & teacher;
// // // EndPoint: /courses/delete/:courseID;
// // // FRONTEND: when admin/teacher want to delete his existing courses
// // courseRoute.delete("/delete/:courseID", async (req, res) => {
// //   try {
// //     if (req.body.role == "admin" || req.body.role == "teacher") {
// //       const courseID = req.params.courseID;
// //       const course = await courseModel.findByIdAndDelete({ _id: courseID });
// //      // console.log(course);
// //       if (!course) {
// //         res.status(404).json({ message: "course not found" });
// //       } else {
// //         res.status(200).json({ message: "course deleted", course });
// //       }
// //     } else {
// //       res
// //         .status(401)
// //         .json({ error: "you don't have access to delete the course" });
// //     }
// //   } catch (err) {
// //     res
// //       .status(400)
// //       .json({ message: "Something Went Wrong", error: err.message });
// //   }
// // });
//
// module.exports = { courseRoute };


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