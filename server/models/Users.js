const mongoose = require('mongoose');
const schema = mongoose.Schema(
    {

        fname:'String',
        lname:'String',
        email:'String',
        username:'String',
        password:'String',
        phone:'String',
        address:'String',
        stream:'String'
    },
    {timestamps: true}
)

const Users = mongoose.model('Users',schema);
module.exports = Users;
