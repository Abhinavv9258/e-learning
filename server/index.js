// // To connect with your mongoDB database
// const mongoose = require('mongoose');
// mongoose.connect('mongodb+srv://abhinavv2180:abhi6BBYM@cluster0.l5gayqw.mongodb.net/users', {
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true
// }, err => err ? console.log(err) :
// 	console.log('Connected to yourDB-name database'));

// // Schema for users of app
// const UserSchema = new mongoose.Schema({
// 	name: {
// 		type: String,
// 		required: true,
// 	},
// 	email: {
// 		type: String,
// 		required: true,
// 		unique: true,
// 	},
// 	date: {
// 		type: Date,
// 		default: Date.now,
// 	},
// });
// const User = mongoose.model('users', UserSchema);
// User.createIndexes();

// // For backend and express
// const express = require('express');
// const app = express();
// const cors = require("cors");
// console.log("App listen at port 5000");
// app.use(express.json());
// app.use(cors());
// app.get("/", (req, resp) => {

// 	resp.send("App is Working");
// 	// You can check backend is working or not by
// 	// entering http://loacalhost:5000
	
// 	// If you see App is working means
// 	// backend working properly
// });

// app.post("/register", async (req, resp) => {
// 	try {
// 		const user = new User(req.body);
// 		let result = await user.save();
// 		result = result.toObject();
// 		if (result) {
// 			delete result.password;
// 			resp.send(req.body);
// 			console.log(result);
// 		} else {
// 			console.log("User already register");
// 		}

// 	} catch (e) {
// 		resp.send("Something Went Wrong");
// 	}
// });
// app.listen(5000);


// const mongoose = require('mongoose')

// const url = `mongodb+srv://abhinavv2180:abhi6BBYM@cluster0.l5gayqw.mongodb.net/?retryWrites=true&w=majority`;

// const connectionParams={
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true 
// }
// mongoose.connect(url,connectionParams)
//     .then( () => {
//         console.log('Connected to database ')
//     })
//     .catch( (err) => {
//         console.error(`Error connecting to the database. \n${err}`);
//     })

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://abhinavv2180:abhi6BBYM@cluster0.l5gayqw.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
