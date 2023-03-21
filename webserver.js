// create an express server
const express = require('express');
const app = express();
const port = 3000;

// import body-parser
const bodyParser = require('body-parser');

// import the neural network
const { net } = require('./network.js');

// middleware
app.use(bodyParser.json());

// create a route to get the prediction for a chat log. the log is an array of strings
app.post('/predict', (req, res) => {

    // get the log from the request body
    const log = req.body.log;

    // get the prediction
    const prediction = net.run(log);
    
    // send the prediction back to the client
    res.status(200).send({
        prediction: prediction
    });
});

// start the server
app.listen(port, () => console.log(`Listening on localhost:${port}!`));