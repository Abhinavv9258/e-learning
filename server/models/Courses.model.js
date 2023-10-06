const mongoose = require('mongoose');

const schema = mongoose.Schema({
    adminUsername:{
        type: String,
        // require:true
    },
    title: {
        type: String,
        // required: true
    },
    category:{
        type:String,
        // require:true
    },
    subCategory:{
        type:String,
        // require:true
    },
    topic:{
        type:String,
        // require:true
    },
    description: {
        type: String,
        // required: true
    },
    language:{
        type:String,
        // require:true
    },
    videoDuration:{
        type:String,
        // require:true
    },
    price:{
        type:Number,
        // require:true,
    },
    thumbnail:{
        type:String,
        // require:true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updateAt: {
        type: Date,
        default: Date.now
    }
    // videos: [{type: mongoose.Schema.Types.ObjectId, ref: "videos"}],
});

const Courses = mongoose.model('Courses',schema);
module.exports = Courses;
