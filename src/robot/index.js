/**
 * Class that represents the robots specified in the input
 */
class Robot {
	constructor(marsMap, initPosition, orders, commands) {
		this.marsMap = marsMap;
		this.initPosition = initPosition;
		this.actualPosition = initPosition;
		this.orders = orders;
		this.commands = commands;
	}

	executeOrders() {
		for (let order of this.orders) {
			const commandResult = this.commands[order](this);
			if (!commandResult) { // stops executing orders (robot is LOST)
				break;
			}
		}
	}

	stringFinalPosition() {
		const {x, y, orientation} = this.actualPosition;
		let string = `${x} ${y} ${orientation}`;

		if (this.actualPosition.isLost) {
			string += ' LOST';
		}

		return string;
	}
}

module.exports = Robot;