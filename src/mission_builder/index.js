/**
 * Builds and stores all the mission information from input file
 */
const os = require('os');

const MarsMap = require('../mars_map');
const Robot = require('../robot');

const commands = require('../robot/commands');

module.exports = function(fileContent) {
	const fileLines = parseFileContent(fileContent);
	const marsMap = buildMarsMap(fileLines.shift());

	const missionInfo = {
		marsMap,
		robots: buildRobots(fileLines, marsMap)
	}

	return missionInfo;
}

// Pivate functions
const parseFileContent = (fileContent) => {
	const fileContentTrimmed = fileContent.trim();

	const fileLines = fileContentTrimmed.split(os.EOL);

	if (fileLines.length % 2 === 0) {
		throw new Error('The orders file is malformed, please check it');
	}

	return fileLines;
}

const buildMarsMap = (coordinates) => {
	const [x, y] = coordinates.split(' ');

	const xInt = parseInt(x);
	const yInt = parseInt(y);

	if (xInt > 50 || yInt > 50) {
		throw new Error('Ops! The world is too big');
	}

	const worldSize = {
		x: parseInt(x),
		y: parseInt(y)
	}

	return new MarsMap(worldSize);
}

const buildRobots = (fileLines, marsMap) => {
	const robots = []

	for (let idx = 0; idx <= fileLines.length - 2; idx += 2) {
		const initPosition = getInitPosition(fileLines[idx])
		const orders = getOrders(fileLines[idx + 1], idx)

		robots.push(new Robot(marsMap, initPosition, orders, commands));
	}

	return robots;

	// Inner functions
	function getInitPosition(initPositionString) {
		const [x, y, orientation] = initPositionString.split(' ');

		return {
			x: parseInt(x),
			y: parseInt(y),
			orientation
		}
	}

	function getOrders(commandLine, robotNumber) {
		if (commandLine.length > 100) {
			throw new Error(`Too many orders passed to robot number ${robotNumber}`)
		}

		return commandLine.split('');
	}
};