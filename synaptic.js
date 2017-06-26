console.log('loaded');

// Example
// Supervised! Means, we know correct outcomes, not search hidden corellations. Not really "real"

// settings - depends on data
var inputCount = 2; // age, illness?
var outputCount = 3; // out in hours, days, weeks?
var learningRate = 0.4; // trial and error? how to set in unsupervised?
var trainSteps = 1000;

// completely fiction data
var trainingData = [
    {input: [0, 0], output: [1, 0, 0]}, // young, not severe illness -> out in hours
    {input: [0, 1], output: [0, 1, 0]}, // young, severe illness -> out in days
    {input: [1, 0], output: [0, 1, 0]}, // old, not severe illness -> out in days
    {input: [1, 1], output: [0, 0, 1]}, // old, severe illness -> out in weeks
];

function train() {
    for(var i = 0; i < trainingData.length; i++) {
        input.activate(trainingData[i]["input"]);
        output.activate();
        output.propagate(learningRate, trainingData[i]["output"]);
    }
}

function retrain() {
    for(var i = 0; i < trainSteps; i++) {
        trainingData = _.shuffle(trainingData);
        train();
    }
}

// create a network
var input = new synaptic.Layer(inputCount);
var output = new synaptic.Layer(outputCount);
input.project(output); // map inputs to output
retrain(); // train

input.activate([0,1]); // young, not-so-ill

var result = output.activate();

console.log("Hours neuron: " + result[0] * 100 + "%");
console.log("Days neuron: " + result[1] * 100 + "%");
console.log("Weeks neuron: " + result[2] * 100 + "%");

// todo: normalize (split to make 100% sum)