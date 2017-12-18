'use strict';
// this module demonstrates how you can use functions as components. check out sender-impl for how to use classes
module.exports = function ReceiverImpl(config /*, components */) { //could ask for additional components, but does not need it
	this.receive = function (message) {
		console.log(config.name + ' received ' + message);
	};
};
