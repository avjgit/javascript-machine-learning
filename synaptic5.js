console.log('loaded');

// Example
// Supervised! Means, we know correct outcomes, not search hidden corellations. Not really "real"

// settings - depends on data
var inputCount = 2; // age, illness?
var outputCount = 3; // out in hours, days, weeks?
var learningRate = 0.4; // trial and error? how to set in unsupervised?
var trainSteps = 1000;

var young = 0; var old = 1;
var illLight = 0; var illSevere =1;
var outInHours = [1, 0, 0];
var outInDays = [0, 1, 0];
var outInMonths = [0, 0, 1];

// completely fiction data
var trainingData = [
    { input: [young, illLight], output: outInHours }, // young, not severe illness -> out in hours
    { input: [young, illSevere], output: outInDays }, // young, severe illness -> out in days
    { input: [old, illLight], output: outInDays }, // old, not severe illness -> out in days
    { input: [old, illSevere], output: outInMonths }, // old, severe illness -> out in weeks
];

function train(data) {
    for (var i = 0; i < data.length; i++) {
        input.activate(data[i]["input"]);
        output.activate();
        output.propagate(learningRate, data[i]["output"]);
    }
}

function retrain(data) {
    for (var i = 0; i < trainSteps; i++) {
        train(_.shuffle(data));
    }
}

// create a network
var input = new synaptic.Layer(inputCount);
var output = new synaptic.Layer(outputCount);
input.project(output); // map inputs to output
retrain(trainingData); // train

input.activate([0, 1]); // young, not-so-ill

var result = output.activate();

console.log("Hours neuron: " + result[0] * 100 + "%");
console.log("Days neuron: " + result[1] * 100 + "%");
console.log("Weeks neuron: " + result[2] * 100 + "%");

function getStayLength(testData) {
    
}
// todo: normalize (split to make 100% sum)