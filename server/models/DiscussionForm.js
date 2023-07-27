const mongoose = require('mongoose');
const schema = mongoose.Schema(
    {
        title:'String',
        content:'String'
    },
    {timestamps: true}
)

const DiscussionForm = mongoose.model('DiscussionForm',schema);
module.exports = DiscussionForm;
