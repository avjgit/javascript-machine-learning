console.log('loaded');

var young = 0;
var old = 1;
var illSevere = 0;
var illNotSevere = 1;
var outInHours = [1, 0, 0];
var outInDays = [0, 1, 0];
var outInWeeks = [0, 0, 1];
var trainingData = [
    [ [young, illNotSevere], outInHours ], // young, not severe illness -> out in hours
    [ [young, illSevere], outInDays ], // young, severe illness -> out in days
    [ [old, illNotSevere], outInDays ], // old, not severe illness -> out in days
    [ [old, illSevere], outInWeeks ]  // old, severe illness -> out in weeks
];
var testData = [old, illNotSevere]

// todo: normalize (split to make 100% sum)
console.log("call:");
console.log("getPeriodOfStay([[ [0, 0], [1, 0, 0] ],    [ [0, 1], [0, 1, 0] ],    [ [1, 0], [0, 1, 0] ],    [ [1, 1], [0, 0, 1] ]], [1,0])");
console.log("or:");
console.log("getPeriodOfStay([old, illNotSevere])");

// network

var machineLearningInput;

function learnPeriodOfStay(data) {
    var inputsCount = 2;
    var outputsCount = 3;
    var learningRate = 0.4;
    var trainSteps = 1000;
    var machineLearningInput = new synaptic.Layer(inputsCount);
    var output = new synaptic.Layer(outputsCount);
    machineLearningInput.project(output);

    for (var i = 0; i < trainSteps; i++) {
        data = _.shuffle(data);
        for (var i = 0; i < data.length; i++) {
            machineLearningInput.activate(data[i][0]);
            output.activate();
            output.propagate(learningRate, data[i][1]);
        }
    }
}

//learnPeriodOfStay(trainingData);

function getPeriodOfStay(data) {
    machineLearningInput.activate(testData);
    var learned = output.activate();
    console.log("Hours neuron: " + learned[0] * 100 + "%");
    console.log("Days neuron: " + learned[1] * 100 + "%");
    console.log("Weeks neuron: " + learned[2] * 100 + "%");
}