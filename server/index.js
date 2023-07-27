const express = require('express');
const db = require('./connection');
const app = express();

// import models
const postModel = require('./models/postModels');
const adminModel = require('./models/Admin');
const userModel = require('./models/Users');
const contactUsModel = require('./models/ContactUs');
const coursesModel = require('./models/Courses');
const discussionModel = require('./models/DiscussionForm');
const feedbackModel = require('./models/Feedback');


// app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());


// RegisterPage
// CRUD OPERATIONS
app.post('/',async(req,res)=>{
    const {title,content} = req.body;
    try{
        const newPost = await postModel.create({title,content});
        res.json(newPost);
    }catch(error){
        res.status(500).send(error);
    }
});


app.post('/RegisterPage',async(req,res)=>{
    const {lname,email,username,password,phone,address,stream} = req.body;
    try{
        const newPost = await postModel.create({lname,email,username,password,phone,address,stream});
        res.json(newPost);
    }catch(error){
        res.status(500).send(error);
    }
});


app.get('/',async(req,res)=>{
    try{
        const posts = await postModel.find();
        res.json(posts);
    }catch(error){
        res.status(500).send(error);
    }
})


app.get('/:id',async(req,res) => {
    const {id} = req.params;
    try{
        const post = await postModel.findById(id);
        res.json(post);
    }catch(error){
        res.status(500).send(error);
    }
})


app.put('/:id',async(req,res) => {
    const {id} = req.params;
    const {title, content} = req.body;
    try{
        const updatePost = await postModel.findByIdAndUpdate(id,{title,content});
        res.json(updatePost);
    }catch(error){
        res.status(500).send(error);
    }
})


app.delete('/:id',async(req,res) => {
    const {id} = req.params;
    try{
        const deletePost = await postModel.findByIdAndDelete(id);
        // const deletePost = await postModel.findById(id);
        // await deletePost.remove();
        res.json('Post Deleted Successfully');
    }catch(error){
        res.status(500).send(error);
    }
})


app.listen(3030, () => {
    console.log('Listning to port 3030...');
})
