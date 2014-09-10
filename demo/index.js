var Scope = require('..');
var scope = new Scope();

var child = scope.$new();

child.$watch('hello',function (scope) {
	console.log(scope.hello);
});

scope.cool = { "neat" : "stuff", hello: "dude" }
scope.hello = "world";

scope.$apply();