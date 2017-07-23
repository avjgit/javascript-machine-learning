var machineLearningInput;
var machineLearningOutput;

function synaptic_simple_learn(x, y, learningRate = 0.4, trainingSteps = 1000) {

    function train_step(data) {
        for (var i = 0; i < data.length; i++) {
            machineLearningInput.activate(data[i][0]);
            machineLearningOutput.activate();
            machineLearningOutput.propagate(learningRate, data[i][1]);
        }
    }

    function train(data) {
        for (var i = 0; i < trainingSteps; i++) {
            train_step(_.shuffle(data));
        }
    }

    var inputCount = x[0].length;
    var outputCount = y[0].length;

    var data =[]
    for (var i = 0; i < x.length; i++) {
        data.push([ x[i], y[i] ]);
    }

    machineLearningInput = new synaptic.Layer(inputCount);
    machineLearningOutput = new synaptic.Layer(outputCount);
    machineLearningInput.project(machineLearningOutput); // map machineLearningInputs to machineLearningOutput
    train(data);
}

function normalize(y) {
    var sum = 0;
    for (var i = 0; i < y.length; i++) {
        sum += y[i];
    }
    var y_normalized = [];
    for (var i = 0; i < y.length; i++) {
        y_normalized.push( (y[i] / sum).toFixed(2));
    }
    return y_normalized;
}

function synaptic_simple_predict(x){
    machineLearningInput.activate(x);
    var result = machineLearningOutput.activate();
    result = normalize(result);
    for (var i = 0; i < result.length; i++) {
        var nr = i+1;
        var percent = result[i] * 100;
        console.log("Neuron " + nr + ": " + percent + "%");
    }
}
