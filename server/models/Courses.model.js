const mongoose = require('mongoose');

const schema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category:{
        type:String,
        require:true
    },
    admin:{
        type: String,
        require:true
    },
    adminID:{
        type: mongoose.Schema.Types.ObjectId,
        require:true
    },
    price:{
        type:Number,
        require:true,
    }
    ,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updateAt: {
        type: Date,
        default: Date.now
    },
    videos: [{type: mongoose.Schema.Types.ObjectId, ref: "videos"}],
});

const Courses = mongoose.model('Courses',schema);
module.exports = Courses;
