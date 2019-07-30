const commands = require('../src/robot/commands');
const MarsMap = require('../src/mars_map');
const Robot = require('../src/robot');

describe('Commands spec', function() {
	describe('Left', function() {
		test('should turn to left properly', function() {
			const marsMap = new MarsMap({
				x: 5,
				y: 3
			});

			const robotInitPosition = {
				x: 1,
				y: 1,
				orientation: 'E'
			}
			const robotOrders = [];
			const robot = new Robot(marsMap, robotInitPosition, robotOrders, commands);

			const result = commands.L(robot);

			expect(result).toBeTruthy();
			expect(robot.actualPosition.orientation).toBe('N');

			commands.L(robot);
			expect(robot.actualPosition.orientation).toBe('W');
			commands.L(robot);
			expect(robot.actualPosition.orientation).toBe('S');
			commands.L(robot);
			expect(robot.actualPosition.orientation).toBe('E');
		});

	});

	describe('Right', function() {
		test('should turn to right properly', function() {
			const marsMap = new MarsMap({
				x: 5,
				y: 3
			});

			const robotInitPosition = {
				x: 1,
				y: 1,
				orientation: 'E'
			}
			const robotOrders = [];
			const robot = new Robot(marsMap, robotInitPosition, robotOrders, commands);

			const result = commands.R(robot);

			expect(result).toBeTruthy();
			expect(robot.actualPosition.orientation).toBe('S');

			commands.R(robot);
			expect(robot.actualPosition.orientation).toBe('W');
			commands.R(robot);
			expect(robot.actualPosition.orientation).toBe('N');
			commands.R(robot);
			expect(robot.actualPosition.orientation).toBe('E');
		});
	});
})