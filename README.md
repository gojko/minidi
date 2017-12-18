# minidi

Minimal, convention-based, inversion-of-control/dependency injection for Node.js. Originally written for [Appraise](https://github.com/appraiseqa). Designed to work 


## Features

* minimal impact on your code -- requires components only to have a specific constuctor/function parameters 
* loads components lazily/on demand
* easy, convention based access to components -- just ask for a property passed into the constructor

## Limitations

* only modules can be components (local files and NPM modules are supported)
* does not support cyclic dependencies
* components must be classes or functions that can be instantiated with `new`
* all components are initialised at most once


## Install from NPM

```bash
npm inistall minidi
```

### Usage

For a quick example, check out the [Example Project](example). Run `node main.js` in the example directory to see it in action. 

#### Component syntax

Each component should have a constructor with two arguments, `config` and `components`. The `config` property will contain any generic configuration passed to the component builder during initialisation, and `components` will be a key-value map of all the other components. Just access any other component by property name. MiniDi will dynamically instantiate components as they are needed. 

For unit testing purposes, instantiate the component class directly and pass mock collaborators or test stubs into the second argument.

```js
module.exports = class Sender {
  // constructor for components receives all other components
	constructor(config, components) { 
    // just ask for a component by name, it will be lazily-initialised if required
		this.receiver = components.receiver; 
	}
	send(message) {
		this.receiver.receive(message);
	}
};
```

### Initialising the container

Create a new instance of `minidi` and pass in the generic configuration and a key-value map of component modules. 

If you want to use local files instead of package dependencies/Node module names, remember to use `__dirname` to ensure that local paths are resolved based on the current file, for example `path.join(__dirname, 'sender')`.

Just access any component directly as a property of the container instance, using the name from the `components` map.

```js
const MiniDi = require('minidi'),
  path = require('path'),
  config = { 
    // configuration passed to all your components, 
    // eg command line options or the contents of a config file
  },
  components = {
    //key-value hash.
    //keys are component names
    //values are module names or local file paths with
    sender: 'some-node-module',
    receiver: path.join(__dirname, 'receiver')
  },
  minidi = new MiniDi(config, components);

minidi.singer.sing(/*... */); // just access a component by property name
```


## Author

[Gojko Adzic](https://gojko.net)

## License

MIT, see the [License](LICENSE)

