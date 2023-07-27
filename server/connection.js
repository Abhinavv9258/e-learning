const mongoose = require('mongoose');
require('dotenv').config();
const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

// here change database name from myBlogs to E-Learn
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.l5gayqw.mongodb.net/E-Learn?retryWrites=true&w=majority`;

const connexion = mongoose.connect(uri, connectionParams)
.then(() => console.log('connection established'))
.catch((error) => console.log(error));

module.exports =  connexion
