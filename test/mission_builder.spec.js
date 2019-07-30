const path = require('path');
const fs = require('fs');

const missionBuilder = require('../src/mission_builder');
const MarsMap = require('../src/mars_map');
const Robot = require('../src/robot');
const commands = require('../src/robot/commands');

describe('Mission builder', () => {
	const fixtures = path.resolve('test', 'fixtures', 'mission_builder');

	test('should parse successfully the input file', function() {
		const input = fs.readFileSync(path.join(fixtures, 'ok_input.txt'), 'utf8');
		const marsMap = new MarsMap({
			x: 5,
			y: 3
		});

		// RobotA definition
		const robotAInitPosition = {
			x: 1,
			y: 1,
			orientation: 'E'
		}
		const robotAOrders = ['R', 'F', 'R', 'F', 'R', 'F', 'R', 'F'];
		const robotA = new Robot(marsMap, robotAInitPosition, robotAOrders, commands);

		// RobotB definition
		const robotBInitPosition = {
			x: 3,
			y: 2,
			orientation: 'N'
		}
		const robotBOrders = ['F', 'R', 'R', 'F', 'L', 'L', 'F', 'F', 'R', 'R', 'F', 'L', 'L'];
		const robotB = new Robot(marsMap, robotBInitPosition, robotBOrders, commands);

		const robots = [robotA, robotB];

		const expected = {
			marsMap,
			robots
		}
		const result = missionBuilder(input);

		expect(result).toEqual(expected);
	});

	test('should throw an error if input file is malformed', function() {
		const input = fs.readFileSync(path.join(fixtures, 'nok_input.txt'), 'utf8');

		expect(() => missionBuilder(input)).toThrowError('The orders file is malformed, please check it')
	});

	test('should throw an error if the world is too big', function() {
		const input = fs.readFileSync(path.join(fixtures, 'too_big.txt'), 'utf8');

		expect(() => missionBuilder(input)).toThrowError('Ops! The world is too big')
	});

	test('should throw an error if too many orders are passed', function() {
		const input = fs.readFileSync(path.join(fixtures, 'too_many_orders.txt'), 'utf8');

		expect(() => missionBuilder(input)).toThrowError('Too many orders passed to robot number 0')
	});
})