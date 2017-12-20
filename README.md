# minidi

Minimal, convention-based, inversion-of-control/dependency injection for Node.js. Originally written for [Appraise](https://github.com/appraiseqa). 

Designed to work with minimal impact on client code and make unit testing easy. 

## Features

* loads components lazily/on demand
* easy, convention based access to components -- just ask for a property passed into the constructor
* minimal impact on your code -- requires components only to have a specific constructor/function parameter
* no external dependencies
* production-ready, tested
* supports any Node module as a component, including NPM/Node packages and local files
* supports primitive objects as components

## Limitations

* all components are initialised at most once
* does not support cyclic dependencies


## Install from NPM

```bash
npm install minidi
```

### Usage

For a quick example, check out the [Example Project](example). Run `node main.js` in the example directory to see it in action. 

#### Component syntax

Each component should have a constructor with a single argument, a key-value map for the configuration. The component can access other components or any generic configuration passed to the component builder simply by accessing properties of the configuration. MiniDi will dynamically instantiate components as they are needed. 

For unit testing purposes, instantiate the component class directly and pass mock collaborators or test stubs into the second argument.

```js
module.exports = class Sender {
  // constructor for components receives all other components
	constructor(config) { 
    // just ask for a component by name, it will be lazily-initialised if required
		this.receiver = config.receiver; 
	}
	send(message) {
		this.receiver.receive(message);
	}
};
```

### Initialising the container

Create a new instance of `minidi` and pass in two arguments: static properties and component modules.

```js
const MiniDi = require('minidi'),
  container = new MiniDi(staticProperties, componentModules);
```

* `staticProperties`: `map(String->Any)`, literal values (eg config properties, strings, arrays or objects you already initialised) that will be passed to components unmodified
* `componentModules`: `map(String->String)` maps component names into module names for dynamic loading. These components will be instantiated on demand from modules when other components ask for them.

Modules are loaded using the normal Node `require` method, so you can use anything that Node can load as a component, including Node module names, NPM packages or file paths. If you want to use local files instead of package dependencies/Node module names, remember to use `__dirname` to ensure that local paths are resolved relative to the current file, and not the `minidi` package. For example, to reference a `sender` module in the same directory as the current file, use `path.join(__dirname, 'sender')`.

Just access any component directly as a property of the container instance, using the name from the `components` map.

```js
const MiniDi = require('minidi'),
  path = require('path'),
  // static properties to pass into components
  config = { 
    name: 'Tom' 
  },
  // dynamic components to instantiate
  modules = {
    //keys are component names
    //values are module names or local file paths with
    sender: 'some-node-module',
    receiver: path.join(__dirname, 'receiver')
  },
  minidi = new MiniDi(config, modules);

minidi.sender.send(/*... */); // just access a component by property name
```


## Author

[Gojko Adzic](https://gojko.net)

## License

MIT, see the [License](LICENSE)

