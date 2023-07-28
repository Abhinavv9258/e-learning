const mongoose = require('mongoose');
const schema = mongoose.Schema({

    fname: {
        type: 'string',
        required: true
    },
    lname: {
        type: 'string',
        required: true
    },
    email: {
        type: 'string',
        required: true
    },
    username: {
        type: 'string',
        required: true
    },
    password: {
        type: 'string',
        required: true
    },
    phone: {
        type: 'Number',
        required: true
    },
    address: {
        type: 'string',
        required: true
    },
    stream: {
        type: 'string',
        required: true
    },
    courseEnrolled:[{type: mongoose.Schema.Types.ObjectId, ref: 'course'}],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updateAt: {
        type: Date,
        default: Date.now
    },
    // versionKey: {
    //     default:false
    // }
})

const Users = mongoose.model('Users',schema);
module.exports = Users;
