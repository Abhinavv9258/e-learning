const express = require('express');
const userRoutes = express.Router();
const {
    register,
    login,
    updateUser,
    deleteUser,
    getUser,
    getAllUsers,
    addCourse,
    checkCourse,
    enrolledCourse
} = require('../controllers/users.controllers.js')

const { verifyToken, verifyUser, verifyAdmin } = require('../utils/verifyToken.js')


userRoutes.get("/checkauthentication", verifyToken, (req, res, next) => {
    try {
        const user = req.user;
        res.json(user);
    } catch (error) {
        // Handle errors
        console.error("Error checking authentication:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


userRoutes.get("/checkuser/:id", verifyUser, (req, res, next) => {
    try {
        const user = req.user;
        const message = `Hello ${user.name}, you are logged in & you can delete your account.`
        const jsonResponse = {
            message: message
        };
        res.json(jsonResponse);
    } catch (error) {
        // Handle errors
        console.error("Error checking user:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


userRoutes.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
    try {
        const user = req.user;
        const message = `Hello ${user.name}, you are logged in & you can delete all accounts.`
        const jsonResponse = {
            message: message
        };
        res.json(jsonResponse);
    } catch (error) {
        // Handle errors
        console.error("Error checking admin:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


//CREATE
// userRoutes.post("/", createUser);

// User Authentication
userRoutes.post('/register', register);
userRoutes.post('/login', login);

//UPDATE
userRoutes.put("/:id", verifyUser, updateUser);

//DELETE
userRoutes.delete("/:id", verifyUser, deleteUser);

//GET
userRoutes.get("/:id", verifyUser, getUser);

//GET ALL
userRoutes.get("/", verifyAdmin, getAllUsers);


//ADD Course Details to User
userRoutes.post("/add-course/:id", verifyUser, addCourse);

//CHECK Course Details
userRoutes.post("/check-course/:id", verifyUser, checkCourse);

// FETCH User Course Details
userRoutes.get('/:id/enrolled-courses', verifyUser, enrolledCourse);

module.exports = { userRoutes };