'use strict';
// this module demonstrates how you can use functions as components. check out sender-impl for how to use classes
module.exports = function ReceiverImpl(config) {
	this.receive = function (message) {
		// ask for components or parameters by name
		console.log(config.name + ' received ' + message);
	};
};
