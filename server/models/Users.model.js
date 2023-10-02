const mongoose = require('mongoose');
const schema = mongoose.Schema(
    {
        name: {
            type: 'string',
            // required: true
        },
        email: {
            type: 'string',
            required: true,
            unique: true
        },
        username: {
            type: 'string',
            required: true,
            unique: true
        },
        password: {
            type: 'string',
            required: true
        },
        phone: {
            type: 'Number',
            // required: true
        },
        address: {
            type: 'string',
            // required: true
        },
        stream: {
            type: 'string',
            // required: true
        },
        tokens: [
            {
                token: {
                    type: 'string',
                    required: true
                }
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
            type: 'boolean',
            default: false
        }
    }
    , { timestamps: true }
)

const Users = mongoose.model('Users', schema);
module.exports = Users;