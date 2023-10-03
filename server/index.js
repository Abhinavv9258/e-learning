const express = require('express');
const app = express();
const cors = require('cors');
require("dotenv").config();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

// database config
const { connexion } = require('./connection');

const port = process.env.PORT || 3030;

//import routes
const { auth } = require("./middlewares/auth");
const { userRoutes } = require("./routes/users.route");
const { courseRoutes } = require("./routes/courses.route");
const { adminRoute } = require("./routes/admin.route");


app.use(cors({
    credentials: true,
    origin: [`${process.env.REACT_APP_CLIENT_URL}`, `${process.env.REACT_APP_SERVER_URL}`]
}));


mongoose.connection.on("disconnected", () => {
    console.log("MongoDB connection disconnected.");
});

mongoose.connection.on("connected", () => {
    console.log("MongoDB connection connected.");
});


// middleware routes
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", auth);


// routes
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);


/*
// courses routes
// app.use("/user", userRoute);


// CRUD OPERATIONS
// app.post('/',async(req,res)=>{
//     const {title,content} = req.body;
//     try{
//         const newPost = await postModel.create({title,content});
//         res.json(newPost);
//     }catch(error){
//         res.status(500).send(error);
//     }
// });


// user registration
// app.post('/RegisterPage',async(req,res)=>{
//     const user = req.body;
//     const data = new userModel(user);
//     try{
//         await data.save();
//         res.json(data);
//     }catch(error){
//         res.status(500).send(error);
//     }
// });




// app.get('/',async(req,res)=>{
//     try{
//         const posts = await postModel.find();
//         res.json(posts);
//     }catch(error){
//         res.status(500).send(error);
//     }
// })


// app.get('/:id',async(req,res) => {
//     const {id} = req.params;
//     try{
//         const post = await postModel.findById(id);
//         res.json(post);
//     }catch(error){
//         res.status(500).send(error);
//     }
// })


// update user data
// app.put('/create/:id',async(req,res) => {
//     const {id} = req.params;
//     // const updateUser = userModel.updateOne({_id : req.body.id});
//     const updateData = req.body;

//     const {title, content} = req.body;
//     try{
//         const updateUser = await userModel.findById(id);
//         if (!updateUser) {
//             return res.status(404).json({ error: 'User not found.' });
//         }
//         // Update the user information
//         updateUser.fname = updateData.fname || updateUser.fname;
//         updateUser.lname = updateData.lname || updateUser.lame;
//         updateUser.email = updateData.email || updateUser.email;
//         updateUser.username = updateData.username || updateUser.username;
//         updateUser.password = updateData.password || updateUser.password;
//         updateUser.phone = updateData.phone || updateUser.phone;
//         updateUser.address = updateData.address || updateUser.address;
//         updateUser.stream = updateData.stream || updateUser.stream;

//             // Save the updated user to the database
//         const updatedUser = await updateUser.save();
//         // const updatePost = await postModel.findByIdAndUpdate(id,{title,content});
//         // const updatePost = await userModel.updateOne(updateUser);
//         res.json(updatedUser);
//     }catch(error){
//         // console.error('Error updating user:', error);
//         // res.status(500).json({ error: 'Internal server error' });
//         res.status(500).send(error);
//     }
// })


// app.delete('/:id',async(req,res) => {
//     const {id} = req.params;
//     try{
//         const deletePost = await postModel.findByIdAndDelete(id);
//         // const deletePost = await postModel.findById(id);
//         // await deletePost.remove();
//         res.json('Post Deleted Successfully');
//     }catch(error){
//         res.status(500).send(error);
//     }
// })

*/

// error handler
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong!"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    })
})


app.listen(port, () => {
    console.log(`Server running on port ${port} ........`);
})