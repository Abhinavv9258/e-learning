const express = require("express");
const adminModel = require("../models/Admin");
const adminRoute = express.Router();
const crypto = require('crypto');

adminRoute.post('/register',async(req,res)=>{
    const user = req.body;
    const data = new adminModel(user);
    try{
        await data.save();
        res.json(data);
    }catch(error){
        res.status(500).send(error);
    }
});

adminRoute.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        // Find the user by username
        const findUser = await adminModel.findOne({ username });
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
        res.json({ sessionId: sessionId });
        console.log('Successfully saved session ',username,sessionId);
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = { adminRoute };