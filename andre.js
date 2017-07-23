// artificial
// neural network
// deep learning
// reinforcemnt
// epochs

function getExampleData() {

    var young = 0;
    var old = 1;

    var illLight = 0;
    var illSevere = 1;

    // var outInDay = [1, 0, 0];
    // var outInWeek = [0, 1, 0];
    // var outInMonth = [0, 0, 1];

    // todo: how?
    var outInDay = 0;
    var outInWeek = 1;
    var outInMonth = 2;

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

function learn(x, y, learningRate = 0.4, trainingSteps = 1000, network = 'synaptic-simple') {
    switch (network) {
        default:
            synaptic_simple_learn(x, y, learningRate, trainingSteps);
    }
}

function predict(x) {
    switch (network_chosen) {
        default:
            synaptic_simple_predict(x);
    }
}

var testData =getExampleData();
learn(testData[0], testData[1]);
predict([0,0]);
predict([1,0]);
predict([0,1]);
predict([1,1]);