'use strict';
// this module demonstrates how you can use ES6 classes as components. check out receiver-impl for functions
module.exports = class Sender {
	constructor(config) { // constructor for components receives all other components
		this.receiver = config.receiver; // just ask for a component by name, it will be lazily-initialised if required
	}
	send(message) {
		this.receiver.receive(message);
	}
};
