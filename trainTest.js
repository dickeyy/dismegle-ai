// import brain
const brain = require('brain.js');

// import fs
const fs = require('fs');

// import dataModel.json
const data = require('./dataModel.json');

// create a new neural network
const net = new brain.recurrent.LSTM()

// start a timer to track how long it takes to train the neural network
console.time('training time');

// train the neural network
console.log('training neural network...\n');

// train the neural network
net.train(data, {
    errorThresh: 0.01,
    log: true,
    logPeriod: 10,
    iterations: 200
})

// then save the neural network to a file
console.log('saving neural network to file...');

// save the neural network to a file
fs.writeFileSync('./models/network-test.json', JSON.stringify(net.toJSON()));

// stop the timer
console.log('\n')
console.log('Training Complete');
console.timeEnd('training time');
console.log('\n')