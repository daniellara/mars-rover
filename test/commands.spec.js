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

	describe('Forward', function() {
		test('should go forward one position to each orientation', function() {
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

			commands.F(robot)
			expect(robot.actualPosition.x).toEqual(2);
			expect(robot.actualPosition.y).toEqual(1);

			robot.actualPosition.orientation = 'N';
			commands.F(robot)
			expect(robot.actualPosition.x).toEqual(2);
			expect(robot.actualPosition.y).toEqual(2);

			robot.actualPosition.orientation = 'W';
			commands.F(robot)
			expect(robot.actualPosition.x).toEqual(1);
			expect(robot.actualPosition.y).toEqual(2);

			robot.actualPosition.orientation = 'S';
			commands.F(robot)
			expect(robot.actualPosition.x).toEqual(1);
			expect(robot.actualPosition.y).toEqual(1);
		});

		test('should left "scent" if the robot cross the frontier', function() {
			const marsMap = new MarsMap({
				x: 5,
				y: 3
			});

			const robotInitPosition = {
				x: 5,
				y: 3,
				orientation: 'E'
			}
			const robotOrders = [];
			const robot = new Robot(marsMap, robotInitPosition, robotOrders, commands);

			commands.F(robot);
			expect(robot.actualPosition).toEqual({
				x: 5,
				y: 3,
				orientation: 'E',
				isLost: true
			});
			expect(marsMap.getMapValue(5, 3)).toEqual(-1);
		});

		test('should skip order if the robot cross the frontier and there is "scent"', function() {
			const marsMap = new MarsMap({
				x: 5,
				y: 3
			});

			marsMap.setMapValue(5, 3, -1)

			const robotInitPosition = {
				x: 5,
				y: 3,
				orientation: 'E'
			}
			const robotOrders = [];
			const robot = new Robot(marsMap, robotInitPosition, robotOrders, commands);

			commands.F(robot);
			expect(robot.actualPosition).toEqual({
				x: 5,
				y: 3,
				orientation: 'E'
			});
		});
	});
})