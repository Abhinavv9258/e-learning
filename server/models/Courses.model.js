const mongoose = require('mongoose');

const schema = mongoose.Schema(
    {
        adminUsername: {
            type: String,
            // require:true
        },
        title: {
            type: String,
            // required: true
        },
        category: {
            type: String,
            // require:true
        },
        subCategory: {
            type: String,
            // require:true
        },
        topic: {
            type: String,
            // require:true
        },
        description: {
            type: String,
            // required: true
        },
        language: {
            type: String,
            // require:true
        },
        videoDuration: {
            type: String,
            // require:true
        },
        videoLink: {
            type: String,
            // require:true
        },
        playlistLink: {
            type: String,
            // require:true
        },
        price: {
            type: Number,
            // require:true,
        },
        syllabus: [{
            type: String,
        }],
        instructors: [{
            type: String,
        }],
        thumbnail: {
            type: String,
            // require:true,
        },
        fileName: {
            type: String,
            // require:true
        },
        // videos: [{type: mongoose.Schema.Types.ObjectId, ref: "videos"}],
    }
    , { timestamps: true }
);

const Courses = mongoose.model('Courses', schema);
module.exports = Courses;