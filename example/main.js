'use strict';
const path = require('path'),
	MiniDi = require('../index'), // this will be require('minidi') in your project
	config = { // generic app config, passed to all components during initialisation
		name: 'Tom'
	},
	components = { // module names or file paths to implementation classes
		sender: path.resolve(__dirname, 'sender-impl'),
		receiver: path.resolve(__dirname, 'receiver-impl')
	},
	container = new MiniDi(config, components);

// access any initialised component as a property

container.sender.send('Hi there');

