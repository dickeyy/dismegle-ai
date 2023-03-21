const dotenv = require('dotenv');
const { MongoClient, ServerApiVersion } = require('mongodb');

// Dotenv initialize 
dotenv.config();

// Process errors
process.on('uncaughtException', async function (error) {
    console.log('error', error.stack)
});

// Connect to Mongo
const connectDb = () => {
    try {
        const mClient = new MongoClient(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
        mClient.connect().then(() => {
            console.log("Connected to MongoDB")
        })
        const db = mClient.db("dismegle");

        return db;
    } catch (err) {
        console.log(err.stack);
    }
};

exports.connectDb = connectDb;