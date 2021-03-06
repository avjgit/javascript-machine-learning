function getHardcodedExampleData() {

    var young = 0;
    var old = 1;

    var illLight = 0;
    var illSevere = 1;

    var outInHours = [1, 0, 0];
    var outInDays = [0, 1, 0];
    var outInMonths = [0, 0, 1];

    return [
        [[young, illLight], outInHours], // young, not severe illness -> out in hours
        [[young, illSevere], outInDays], // young, severe illness -> out in days
        [[old, illLight], outInDays], // old, not severe illness -> out in days
        [[old, illSevere], outInMonths], // old, severe illness -> out in weeks
    ];
}

var machineLearningInput;
var machineLearningOutput;


// first - learn from data
function learnStayLength(trainingData) {

    // settings - depends on data
    var inputCount = 2; // age, illness
    var outputCount = 3; // out in hours, days, weeks
    var learningRate = 0.4; // trial and error? how to set in unsupervised?
    var trainSteps = 1000;

    function train(data) {
        for (var i = 0; i < data.length; i++) {
            machineLearningInput.activate(data[i][0]);
            machineLearningOutput.activate();
            machineLearningOutput.propagate(learningRate, data[i][1]);
        }
    }

    function retrain(data) {
        for (var i = 0; i < trainSteps; i++) {
            train(_.shuffle(data));
        }
    }

    machineLearningInput = new synaptic.Layer(inputCount);
    machineLearningOutput = new synaptic.Layer(outputCount);
    machineLearningInput.project(machineLearningOutput); // map machineLearningInputs to machineLearningOutput
    retrain(trainingData); // train
}

// second - get machineLearningOutput from trained model
function getStayLength(testData) {
    machineLearningInput.activate(testData);

    var result = machineLearningOutput.activate();

    console.log("Hours neuron: " + result[0] * 100 + "%");
    console.log("Days neuron: " + result[1] * 100 + "%");
    console.log("Weeks neuron: " + result[2] * 100 + "%");
}

// console.log("[deprecated] you may want to use it like that:");
// console.log("[deprecated] learnStayLength(getHardcodedExampleData());");
// console.log("[deprecated] getStayLength([0,1]);");
