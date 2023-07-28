const express = require('express');
const db = require('./connection');
const app = express();
const cors = require('cors');
const crypto = require('crypto');
const bodyParser = require('body-parser');

//import routes
const { userRoute } = require("./routes/users.route");
const { courseRoute } = require("./routes/courses.route");
const { adminRoute } = require("./routes/admin.route");

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(bodyParser.json());

// courses routes
app.use("/courses", courseRoute);
app.use("/admin", adminRoute);
app.use("/user", userRoute);


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


// user registeration
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


app.listen(3030, () => {
    console.log('Listning to port 3030...');
})
