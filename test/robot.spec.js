const MarsMap = require('../src/mars_map');
const Robot = require('../src/robot');

describe('Robot testing', function() {
	const commands = {
		R: jest.fn(() => true),
		L: jest.fn(() => true),
		F: jest.fn(() => true)
	};

	let robot;

	beforeEach(function() {
		const marsMap = new MarsMap({
			x: 5,
			y: 3
		});

		const robotInitPosition = {
			x: 1,
			y: 1,
			orientation: 'E'
		}
		const robotOrders = ['R', 'F', 'R', 'F', 'R', 'F', 'R', 'F'];
		robot = new Robot(marsMap, robotInitPosition, robotOrders, commands);
	});


	test('should create succesfully a new Robot', function() {
		expect(robot.initPosition).toEqual({
			x: 1,
			y: 1,
			orientation: 'E'
		});
		expect(robot.orders).toEqual(['R', 'F', 'R', 'F', 'R', 'F', 'R', 'F']);
		expect(robot.commands).toEqual(commands);
	});

	test('should execute the command function for each order', function() {
		robot.executeOrders();

		expect(commands.F).toHaveBeenCalledTimes(4)
		expect(commands.R).toHaveBeenCalledTimes(4)
		expect(commands.L).toHaveBeenCalledTimes(0)
	})
});