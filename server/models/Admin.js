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
        stream:'String',
        addedCouses:'String',
    },
    {timestamps: true}
)

const Admin = mongoose.model('Admin',schema);
module.exports = Admin;