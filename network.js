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
db.collection('filter_logs').find({ input: {$ne: null }, output: {$ne: null} }).toArray().then((data) => {

    
    // loop through data
    data.forEach((item) => {
        // remove the _id field
        delete item._id;
        // remove the users array
        delete item.users;
        // remove teh message_id field
        delete item.message_id;

        // add the item to the training data array
        trainingData.push(item);
    });

    console.log('chats:', trainingData.length);
    log('info', 'chats: ' + trainingData.length);

    // split the array into chunks of 1000
    const chunks = [];
    let i, j, temparray, chunk = 10;
    for (i = 0, j = trainingData.length; i < j; i += chunk) {
        temparray = trainingData.slice(i, i + chunk);
        chunks.push(temparray);
    }

    console.log('chunks:', chunks.length + '\n');
    log('info', 'chunks: ' + chunks.length);

    // wait 5 seconds
    setTimeout(() => {

        // create a new neural network
        const net = new brain.recurrent.LSTM()

        // start a timer to track how long it takes to train the neural network
        console.time('training time');

        // train the neural network
        console.log('training neural network...\n');
        log('info', 'training neural network...');

        // batch the neural network training, do it for each chunk
        chunks.forEach((chunk) => {

            // log which number chunk we are on out of the total number of chunks
            console.log('\n')
            console.log('chunk:', chunks.indexOf(chunk) + 1, '/', chunks.length);
            log('info', 'chunk: ' + (chunks.indexOf(chunk) + 1) + '/' + chunks.length);

            console.time('chunk train time');

            // train the neural network
            net.train(chunk, {
                iterations: 100,
                errorThresh: 0.01,
                log: true,
                logPeriod: 10,
                learningRate: 0.3,
                momentum: 0.1,
                callback: null,
                callbackPeriod: 10,
                timeout: Infinity
            })

            console.log('\n')
            console.timeEnd('chunk train time');
            log('info', 'chunk train time: ' + console.timeEnd('chunk train time'));

            // then save the neural network to a file
            console.log('saving neural network to file...');
            log('info', 'saving neural network to file...');

            // save the neural network to a file
            fs.writeFileSync('./network.json', JSON.stringify(net.toJSON()));
        })

        // stop the timer
        console.log('\n')
        console.log('Training Complete');
        console.timeEnd('training time');
        log('info', 'training time: ' + console.timeEnd('training time'));
        console.log('\n')

        // export the neural network
        exports.net = net;
    
    }, 5000);

});
