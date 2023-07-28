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


module.exports = { userRoute };