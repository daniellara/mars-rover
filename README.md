# **MARS_ROVERS**

## How to use it
The program takes a file with the structure described in the exercise and generates an output file following the example exercise's schema. Both of them can be passed as arguments; if doesn't, the program will use these defaults:
* **For input:** root_path/test/fixtures/e2e/orders.txt
* **For output:** root_path/output.txt

The program doesn't use third party dependencies (only jest but for testing purposes), as consequence we don't need to execute ```npm install``` to run the program. So, we only need to go to the directory and execute:

*Default arguments*
```shell
node bin/mars.js
```

*User arguments*
```shell
node bin/mars.js my_input_path my_output_path
```

**_Note_**: The program has been tested with Node 10.16.0 and npm 6.9.0


## How to add more commands
The program is ready to include new commands. In order to do this, you have to create a new file in *root_path/src/robot/commands*, export a function with the command functionality and add this function to *root_path/src/robot/commands/index.js* with its char order.

*root_path/src/robot/commands/drill.js*
```js
module.exports = function() {
	console.log('Time to drill some rocks!');
	return true; // used to indicate the robot to execute next orders
}
```

*root_path/src/robot/commands/index.js*
```js
const right = require('./right');
const left = require('./left');
const forward = require('./forward');
const drill = require('./drill');

module.exports = {
	R: right,
	F: forward,
	L: left,
	D: drill
}
```

## Next steps
The following improvements could be included:
1. Improve args input.
2. Include more test cases, specially for corner cases.
3. Include some basic GUI (just with terminal ASCII) to follow the Rover movements.
4. Add input file schema for stronger input checking.