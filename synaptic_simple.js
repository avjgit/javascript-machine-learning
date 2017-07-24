var machineLearningInput;
var machineLearningOutput;

function synaptic_simple_learn(x, y, learningRate = 0.4, trainingSteps = 1000, input_is_array = false) {

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
    var outputCount;

    if (input_is_array) {
        // ver. 1: input as array
        outputCount = y[0].length;
    }
    else {
        // ver. 2: input as a single number
        outputCount = Math.max.apply(Math, y) + 1;

        var y_as_neurons_array = [];

        for (var i = 0; i < y.length; i++) {

            var el = [];

            for (var z = 0; z < outputCount; z++) {
                if (z == y[i]) {
                    el.push(1);
                } else {
                    el.push(0);
                }
            }

            y_as_neurons_array.push(el);
        }

        y = y_as_neurons_array;
    }

    var data = []
    for (var i = 0; i < x.length; i++) {
        data.push([x[i], y[i]]);
    }

    // console.log(data);

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
        y_normalized.push((y[i] / sum).toFixed(2));
    }
    return y_normalized;
}

function synaptic_simple_predict(x) {

    machineLearningInput.activate(x);
    var result = machineLearningOutput.activate();

    result = normalize(result);
    for (var i = 0; i < result.length; i++) {
        var nr = i + 1;
        var percent = result[i] * 100;
        console.log("Neuron " + nr + ": " + percent + "%");
    }
}
