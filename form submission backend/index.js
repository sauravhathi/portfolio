const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');
const app = express();
app.use(cors());
app.use(bodyParser.json());
dotenv.config();
const port = 3000;

const client = new MongoClient(process.env.MONGODB_URI);

async function connectToDatabase() {
    try {
        // Connect to the MongoDB server
        await client.connect();
        // use icon
        console.log('🚀 Connected to MongoDB');
    } catch (err) {
        console.log('❌ Error connecting to MongoDB');
        console.error(err);
    }
}

// Connect to the MongoDB server when the Node.js app starts up
connectToDatabase();

// middleware to check if the request body is valid
const middleware = (req, res, next) => {
    const { name, phoneNumber, email, message } = req.body;
    if ((name.length > 3 && name.length < 30) && (phoneNumber.length > 9 && phoneNumber.length < 15) && (email.length > 15 && email.length < 50) && (message.length > 5 && message.length < 200)) {
        next();
    } else {
        res.status(400).send('Invalid request');
    }
}

// post form data
app.post('/form', middleware, async (req, res) => {

    const date_time = new Date(); // Get the current date and time
    const { name, phoneNumber, email, message } = req.body; // Get the form data from the request body
    const collection = client.db(process.env.DB_NAME).collection(process.env.DB_COLLECTION); // Get the collection <database

    try {
        // Insert the form data into the MongoDB collection
        const result = await collection.insertOne({ name, phoneNumber, email, message, date_time });
        console.log(`📄 Inserted a form data into the collection with the _id: ${result.insertedId}`);
        res.send('Successfully submitted');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error submitting form data');
    }
});

// get form data
app.get('/get-form-data', async (req, res) => {
    const collection = client.db(process.env.DB_NAME).collection(process.env.DB_COLLECTION); // Get the collection <database

    try {
        // Get all the form data from the MongoDB collection
        const cursor = collection.find();
        const results = await cursor.toArray();
        res.send(results);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error getting form data');
    }
});

// get home page route
app.get('/', (req, res) => {
    res.send(
        `
        <div style="text-align: center; margin-top: 100px;">
            <h1>Server is alive</h1>
            <p style="font-size: 20px;">
            Visit <a href="https://github.com/sauravhathi" target="_blank" style="color: red; text-decoration: none;">
            @sauravhathi
            </a>
            on GitHub
            </p>
        </div>
        `
    );
});

app.listen(port, () => {
    console.log(`✈️  Server started on port http://localhost:${port}`);
});

