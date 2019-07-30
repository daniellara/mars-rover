/**
 * Class that represents the state of Mars surface
 */
class MarsMap {
	constructor(worldSize) {
		this.x = worldSize.x;
		this.y = worldSize.y;

		this.map = this.buildMap();
	}

	setMapValue(x, y, value) {
		this.map[y][x] = value;
	}

	getMapValue(x, y) {
		return this.map[y][x];
	}

	buildMap() {
		const map = [];

		for(let idxY = 0; idxY <= this.y; idxY++) {
			const xArray = [];

			for(let idxX = 0; idxX <= this.x; idxX++) {
				xArray.push(0)
			}

			map.push(xArray);
		}

		return map;
	}
}

module.exports = MarsMap;