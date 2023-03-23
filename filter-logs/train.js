// import brain
const brain = require('brain.js');

// import fs
const fs = require('fs');

// import db
const { connectDb } = require('./utils/mongo');

// connect to db
const db = connectDb();

// imort log function
const { log } = require('./utils/log');

let trainingData = [];

// get training data from db
db.collection('filter_logs_v2').find({ input: {$ne: null }, output: {$ne: "None"} }).toArray().then((data) => {

    console.log('data points:', data.length);
    log('info', 'data points: ' + data.length);

    // split the array into chunks 
    // const chunks = [];
    // let i, j, temparray, chunk = data.length;
    // for (i = 0, j = trainingData.length; i < j; i += chunk) {
    //     temparray = trainingData.slice(i, i + chunk);
    //     chunks.push(temparray);
    // }

    // console.log('chunks:', chunks.length + '\n');
    // log('info', 'chunks: ' + chunks.length);

    // wait 5 seconds
    setTimeout(() => {

        // create a new neural network
        const net = new brain.recurrent.LSTM()

        // train the neural network
        console.log('training neural network...\n');
        log('info', 'training neural network...');

        // batch the neural network training, do it for each chunk
        // chunks.forEach((chunk) => {

            // log which number chunk we are on out of the total number of chunks

        console.time('chunk train time');

        // train the neural network
        net.train(data, {
            iterations: 500,
            errorThresh: 0.01,
            log: true,
            logPeriod: 1,
        })

        console.log('\n')
        console.timeEnd('chunk train time');
        log('info', 'chunk train time: ' + console.timeEnd('chunk train time'));

        // })

        // then save the neural network to a file
        console.log('saving neural network to file...');
        log('info', 'saving neural network to file...');

        // save the neural network to a file
        fs.writeFileSync('./models/network-v6.json', JSON.stringify(net.toJSON()));
    
    }, 5000);

});