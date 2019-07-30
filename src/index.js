const fs = require('fs');
const path = require('path');
const os = require('os');

const missionBuilder = require('./mission_builder');

module.exports = function(input, output) {
	const fileContent = fs.readFileSync(path.resolve(input), 'utf8');
	const missionInfo = missionBuilder(fileContent);

	fs.writeFileSync(path.resolve(output), '', 'utf8')

	for (let robot of missionInfo.robots) {
		robot.executeOrders();
		fs.appendFileSync(path.resolve(output), `${robot.stringFinalPosition()}${os.EOL}`, 'utf8');
	}
}