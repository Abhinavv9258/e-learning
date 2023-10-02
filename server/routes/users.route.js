/*
const express = require("express");
const userModel = require("../models/Users.model");
const userRoute = express.Router();

// Register API
userRoute.post('/register',async(req,res)=>{
    const user = req.body;
    const data = new userModel(user);
    try{
        await data.save();
        res.json(data);
    }catch(error){
        res.status(500).send(error);
    }
});

// Login API route
userRoute.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        // Find the user by username
        const findUser = await userModel.findOne({ username });
        // if (!user || password !== user.passwordHash) {
        //   return res.status(401).json({ error: 'Invalid credentials' });
        // }
        if (!findUser || password !== findUser.password) {
        return res.status(401).json({ error: 'Invalid credentials' });
        }
        // Generate a random session ID using crypto
        const sessionId = crypto.randomBytes(16).toString('hex');
        // Store the generated session ID in the user document
        findUser.sessionId = sessionId;
        await findUser.save();
        // Send the session ID in the response
        // res.json({ sessionId: sessionId });
        alert('Successfully saved session ',username);
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

userRoute.get('/all',async(req,res)=>{
    try{
        const userInfo = await userModel.find({});
        res.json(userInfo);
    }catch(error){
        res.status(500).send(error);
    }
})


module.exports = { userRoute };

*/

const express = require('express');
const userRoutes = express.Router();
const {
    updateUser,
    deleteUser,
    getUser,
    getAllUsers
} = require('../controllers/users.controllers.js')

const { verifyToken, verifyUser, verifyAdmin } = require('../utils/verifyToken.js')


userRoutes.get("/checkauthentication", verifyToken, (req, res, next) => {
    // res.send("Hello user you are logged in.")
    try {
        // Assuming that the user information is available in req.user
        const user = req.user;
        res.json(user);
    } catch (error) {
        // Handle errors
        console.error("Error checking authentication:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


userRoutes.get("/checkuser/:id", verifyUser, (req, res, next) => {
    // res.send("Hello user, you are logged in & you can delete your account.")
    try {
        // Assuming that the user information is available in req.user
        const user = req.user;
        res.send(`Hello ${user.name}, you are logged in & you can delete your account.`);
    } catch (error) {
        // Handle errors
        console.error("Error checking user:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


userRoutes.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
    // res.send("Hello admin, you are logged in & you can delete all accounts.")
    try {
        // Assuming that the user information is available in req.user
        const user = req.user;
        res.send(`Hello ${user.name}, you are logged in & you can delete all accounts.`);
    } catch (error) {
        // Handle errors
        console.error("Error checking admin:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


//CREATE
// userRoutes.post("/", createUser);

//UPDATE
userRoutes.put("/:id", verifyUser, updateUser);

//DELETE
userRoutes.delete("/:id", verifyUser, deleteUser);

//GET
userRoutes.get("/:id", verifyUser, getUser);

//GET ALL
userRoutes.get("/", verifyAdmin, getAllUsers);


module.exports = { userRoutes };