/**
 * Turn robot to left
 */
module.exports = function(robot) {
	const { x, y, orientation } = robot.actualPosition;
	let newOrientation = rotationMap[orientation];

	robot.actualPosition = {
		x,
		y,
		orientation: newOrientation
	}

	return true;
}

const rotationMap = {
	N: 'W',
	W: 'S',
	S: 'E',
	E: 'N'
}