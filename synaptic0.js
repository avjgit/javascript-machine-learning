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

input.activate([0, 1]);
var result = output.activate();
console.log("Hours neuron: " + result[0] * 100 + "%");
console.log("Days neuron: " + result[1] * 100 + "%");
console.log("Weeks neuron: " + result[2] * 100 + "%");

// todo: normalize (split to make 100% sum)
console.log("call:");
console.log("periodOfStay([[ [0, 0], [1, 0, 0] ],    [ [0, 1], [0, 1, 0] ],    [ [1, 0], [0, 1, 0] ],    [ [1, 1], [0, 0, 1] ]], [1,0])");

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

function periodOfStay(trainingDataIn, testData) {
    var inputsCount = 2;
    var outputsCount = 3;
    var learningRate = 0.4;
    var trainSteps = 1000;
    var input_ = new synaptic.Layer(inputsCount);
    var output_ = new synaptic.Layer(outputsCount);
    input_.project(output_);
    learn(trainingDataIn, trainSteps, learningRate);
    input_.activate(testData);
    var learned = output.activate();
    console.log("Hours neuron: " + learned[0] * 100 + "%");
    console.log("Days neuron: " + learned[1] * 100 + "%");
    console.log("Weeks neuron: " + learned[2] * 100 + "%");
}
