const mongoose = require('mongoose');
const schema = mongoose.Schema(
    {
        title:'String',
        content:'String'
    },
    {timestamps: true}
)

const Feedback = mongoose.model('Feedback',schema);
module.exports = Feedback;
