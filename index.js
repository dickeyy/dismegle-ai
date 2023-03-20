// import brain
const brain = require('brain.js');

const trainingData = [
    { input: "m or f", output: "Omegle Vocab" },
    { input: "hey", output: "None" },
    { input: "hi", output: "None" },
    { input: "hello", output: "None" },
    { input: "horny", output: "NSFW" },
]

const net = new brain.recurrent.LSTM()

net.train(trainingData, {
    iterations: 2000,
    errorThresh: 0.00001,
    log: (stats) => console.log(stats)
})

console.log('Outputs')
console.log(net.run("hey are you m or f"))
console.log(net.run("whats up"))
console.log(net.run("im so horny"))
