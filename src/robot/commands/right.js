/**
 * Turn robot to right
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
	N: 'E',
	E: 'S',
	S: 'W',
	W: 'N'
}