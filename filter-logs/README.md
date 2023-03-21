# Filter Logs Model

This model is designed to read chat logs and analyze them to detect if anything being said could be against Dismegle's ToS. 

The initial state that it is in right now is basically a fancy regex system, however eventually we hope to make it capable of making reliable automated moderation decisions to off-load work from moderators.

An example of the data model can be seen in `dataModel.json`. We found this allowed our ai to train quickly and with minimal error rates. It works by analyzing a number of messages that break a specific rule, these are our input and output values. See below...

```json
[
    {
        "input": "m or f",
        "output": "Omegle Vocabulary"
    }
]
```

We can then call a train function after initiating a new brain, we found that the LTSM structure worked best for string anlysis, we also pass in a number of training options.

```js
const net = new brain.recurrent.LSTM()
...
net.train(data, {
    errorThresh: 0.01,
    iterations: 1000,
    log: true,
    logPeriod: 10,
    iterations: 200
})
```

From there we can save the network to a JSON file to ensure the model is persistent. After that, we can load the model from JSON anyhwere we want

```js
const net = new brain.recurrent.LSTM();
net.fromJSON(JSON.parse(fs.readFileSync('./model.json', 'utf8')));
```

Finally to run data through the model we simply do...

```js
net.run(data);
```