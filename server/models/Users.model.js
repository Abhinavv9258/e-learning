const mongoose = require('mongoose');
const schema = mongoose.Schema(
    {
        name: {
            type: String,
            // required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        phone: {
            type: Number,
            // required: true
        },
        address: {
            type: String,
            // required: true
        },
        stream: {
            type: String,
            // required: true
        },
        tokens: [
            {
                type: String,
                // required: true
            }
        ],
        courseEnrolled: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Courses'
        }],
        createdAt: {
            type: Date,
            default: Date.now
        },
        isAdmin: {
            type: Boolean,
            default: false
        }
    }
    , { timestamps: true }
)

const Users = mongoose.model('Users', schema);
module.exports = Users;