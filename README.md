# Google Summer of Code 2017 | In-browser machine learning

Sourcecode: https://github.com/avjgit/javascript-machine-learning

Object live: http://avjgit.github.io/javascript-machine-learning

### Goal
Create an object that provides serverless machine learning.

### Technologies
Based on [Synaptic](https://github.com/cazala/synaptic): architecture-free neural network library for node.js and the browser 

### Usage
Given data with x as vectors of inputs and y as single outputs,
object is being trained via:
```
learn(x,y)
```

And forecasts for new inputs x' can be obtained by calling:
```
predict(x')
```
