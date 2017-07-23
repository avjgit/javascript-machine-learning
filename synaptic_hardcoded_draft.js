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
    { input: [0, 0], output: [1, 0, 0] }, // young, not severe illness -> out in hours
    { input: [0, 1], output: [0, 1, 0] }, // young, severe illness -> out in days
    { input: [1, 0], output: [0, 1, 0] }, // old, not severe illness -> out in days
    { input: [1, 1], output: [0, 0, 1] }, // old, severe illness -> out in weeks
];

function train(trainingData_, learningRate_) {
    for (var i = 0; i < trainingData_.length; i++) {
        input.activate(trainingData_[i]["input"]);
        output.activate();
        output.propagate(learningRate_, trainingData_[i]["output"]);
    }
}

function retrain(trainingData_, trainSteps_, learningRate_) {
    for (var i = 0; i < trainSteps_; i++) {
        train(_.shuffle(trainingData_), learningRate_);
    }
}

// create a network
var input = new synaptic.Layer(inputCount);
var output = new synaptic.Layer(outputCount);
input.project(output); // map inputs to output
retrain(trainingData, trainSteps, learningRate); // train

input.activate([0, 1]); // young, not-so-ill

var result = output.activate();

console.log("Hours neuron: " + result[0] * 100 + "%");
console.log("Days neuron: " + result[1] * 100 + "%");
console.log("Weeks neuron: " + result[2] * 100 + "%");

// todo: normalize (split to make 100% sum)

console.log("call:");
console.log("learn3OutputsFrom2Inputs([{input: [0, 0], output: [1, 0, 0]},{input: [0, 1], output: [0, 1, 0]},{input: [1, 0], output: [0, 1, 0]},{input: [1, 1], output: [0, 0, 1]}], [0,1])");

function learn3OutputsFrom2Inputs(trainingDataIn, testData) {
    var inputsCount = 2;
    var outputsCount = 3;
    var learningRate = 0.4;
    var trainSteps = 1000;
    var input_ = new synaptic.Layer(inputsCount);
    var output_ = new synaptic.Layer(outputsCount);
    input_.project(output_);
    retrain(trainingDataIn, trainSteps, learningRate);
    input_.activate(testData);
    var learned = output.activate();
    console.log("Neuron #1: " + learned[0] * 100 + "%");
    console.log("Neuron #2: " + learned[1] * 100 + "%");
    console.log("Neuron #3: " + learned[2] * 100 + "%");
}
