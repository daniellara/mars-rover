const MarsMap = require('../src/mars_map');

describe('Mars map', function() {
	test('should create successfully a new Mars map', function() {
		const worldSize = { // First line of input
			x: 5,
			y: 3
		}

		const marsMap = new MarsMap(worldSize);

		expect(marsMap.map.length).toEqual(4);
		expect(marsMap.map[0].length).toEqual(6);
	});
});