// import brain.js
const brain = require('brain.js');

// import fs
const fs = require('fs');

// import the trained model from network.json 
const net = new brain.recurrent.LSTM();
net.fromJSON(JSON.parse(fs.readFileSync('./models/network-v6.json', 'utf8')));

// export the neural network
exports.net = net;
