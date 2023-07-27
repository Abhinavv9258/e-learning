const mongoose = require('mongoose');
const schema = mongoose.Schema(
    {
        title:'String',
        content:'String'
    },
    {timestamps: true}
)

const Courses = mongoose.model('Courses',schema);
module.exports = Courses;
