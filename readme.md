nslo-scope - v0.0.0
===
angular like scope object
## Install
```bash
$ npm install FireNeslo/scope --save
```
## Usage
```js
var Scope = require('..');
var scope = new Scope();

var child = scope.$new();

child.$watch('hello',function (scope) {
	console.log(scope.hello);
});

scope.cool = { "neat" : "stuff", hello: "dude" }
scope.hello = "world";

scope.$apply();
```
## Test
```bash
$ npm install -g mocha
$ npm test
```
##API

<!-- Start /home/fireneslo/Dropbox/nslo/scope/index.js -->

## Scope()

Creates a new Scope

## $watch(path, [fn])

add a watcher to the scope

### Params: 

* **string|function** *path* - path to watch or watch function
* **function** *[fn]* - watch function if path was provided

## $apply([path])

Run all watchers for this scope and child scopes

### Params: 

* **string** *[path]* - watcher path to run

## $new()

creates a new child Scope

<!-- End /home/fireneslo/Dropbox/nslo/scope/index.js -->

