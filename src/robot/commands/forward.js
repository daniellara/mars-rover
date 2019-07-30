/**
 * Moves the robot forward
 */
module.exports = function(robot) {
	const marsMap = robot.marsMap;
	const { x, y, orientation } = robot.actualPosition;
	const actualMapValue = marsMap.getMapValue(x, y);

	if (actualMapValue !== -1 && cannotForward(marsMap, orientation, x , y)) { // robot falls and leaves a scent
		marsMap.setMapValue(x, y, -1);
		robot.actualPosition = {
			x,
			y,
			orientation,
			isLost: true
		}

		return false;
	}

	if (actualMapValue === -1 && cannotForward(marsMap, orientation, x , y)) { // Skips the order because there is scent
		return true;
	}

	robot.actualPosition = move[orientation](x, y);

	return true;
}

const cannotForward = (marsMap, orientation, actualX, actualY) => {
	const { x, y } = marsMap;
	const borderChecker = {
		N: actualY + 1 > y,
		E: actualX + 1 > x,
		S: actualY - 1 < 0,
		W: actualX - 1 < 0
	}

	return borderChecker[orientation];
}

const move = {
	E: (x, y) => {
		const newX = x + 1;
		return {
			x: newX,
			y,
			orientation: 'E'
		}
	},
	W: (x, y) => {
		const newX = x - 1;
		return {
			x: newX,
			y,
			orientation: 'W'
		}
	},
	N: (x, y) => {
		const newY = y + 1;
		return {
			x,
			y: newY,
			orientation: 'N'
		}
	},
	S: (x, y) => {
		const newY = y - 1;
		return {
			x,
			y: newY,
			orientation: 'S'
		}
	}
}