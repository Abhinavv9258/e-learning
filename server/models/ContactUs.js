const mongoose = require('mongoose');
const schema = mongoose.Schema(
    {
        name:'String',
        username:'String',
        phoneNumber:'String',
        emailId:'String',
        description:'String'
    },
    {timestamps: true}
)

const ContactUs = mongoose.model('ContactUs',schema);
module.exports = ContactUs;
