console.log('loaded');

// Example
// Supervised! Means, we know correct outcomes, not search hidden corellations. Not really "real"

// settings - depends on data
var inputCount = 2; // age, illness?
var outputCount = 3; // out in hours, days, weeks?
var learningRate = 0.4; // trial and error? how to set in unsupervised?
var trainSteps = 1000;

var old = 1;
var young = 0;

var illSevere = 1;
var illNotSevere = 0;

var outInHours = [1, 0, 0];
var outInDays = [0, 1, 0];
var outInWeeks = [0, 0, 1];

var trainingData = [
    [ [young, illNotSevere], outInHours ], // young, not severe illness -> out in hours
    [ [young, illSevere], outInDays ], // young, severe illness -> out in days
    [ [old, illNotSevere], outInDays ], // old, not severe illness -> out in days
    [ [old, illSevere], outInWeeks ]  // old, severe illness -> out in weeks
];



// create a network
var input = new synaptic.Layer(inputCount);
var output = new synaptic.Layer(outputCount);
input.project(output); // map inputs to output
learn(trainingData, trainSteps, learningRate); // train

input.activate([1, 1]); // young, not-so-ill

var result = output.activate();

console.log("Hours neuron: " + result[0] * 100 + "%");
console.log("Days neuron: " + result[1] * 100 + "%");
console.log("Weeks neuron: " + result[2] * 100 + "%");

function train(trainingData_, learningRate_) {
    for (var i = 0; i < trainingData_.length; i++) {
        input.activate(trainingData_[i][0]);
        output.activate();
        output.propagate(learningRate_, trainingData_[i][1]);
    }
}

function learn(trainingData_, trainSteps_, learningRate_) {
    for (var i = 0; i < trainSteps_; i++) {
        train(_.shuffle(trainingData_), learningRate_);
    }
}
