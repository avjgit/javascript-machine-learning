// artificial
// neural network
// deep learning
// reinforcemnt
// epochs

function getExampleData(input_is_array = false) {

    var young = 0;
    var old = 1;

    var illLight = 0;
    var illSevere = 1;

    var outInDay;
    var outInWeek;
    var outInMonth;

    if (input_is_array) {
        // ver. 1: input as array
        outInDay = [1, 0, 0];
        outInWeek = [0, 1, 0];
        outInMonth = [0, 0, 1];
    }
    else {
        // ver. 2: input as a single number
        outInDay = 0;
        outInWeek = 1;
        outInMonth = 2;
    }

    var patientData = [
        [young, illLight],  // young, not severe illness -> out in hours
        [young, illSevere], // young, severe illness -> out in days
        [old, illLight],    // old, not severe illness -> out in days
        [old, illSevere]    // old, severe illness -> out in weeks
    ];

    var patientDischarge = [
        outInDay,
        outInWeek,
        outInWeek,
        outInMonth
    ];

    return [patientData, patientDischarge];
}

var network_chosen = 'synaptic-simple';

function learn(x, y, learningRate = 0.4, trainingSteps = 1000, input_is_array = false, network = 'synaptic-simple') {
    switch (network) {
        default:
            synaptic_simple_learn(x, y, learningRate, trainingSteps, input_is_array);
    }
}

function predict(x) {
    switch (network_chosen) {
        default:
            synaptic_simple_predict(x);
    }
}

var input_is_array = true;
var testData = getExampleData(input_is_array);
learn(testData[0], testData[1], 0.4, 1000, input_is_array);
predict([0, 0]);
predict([1, 0]);
predict([0, 1]);
predict([1, 1]);
