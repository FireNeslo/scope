function apply(scope,queue) {'use strict';
	if(queue) for (var i = 0; i < queue.length; i++) queue[i](scope);
}
/**
 * Creates a new Scope
 * @module nslo-scope
 */
function Scope (queue, children, watch) {'use strict';
	if(!this) return new Scope(queue, children, watch);
	if(!queue) queue = [];
	if(!children) children = [];
	if(!watch) watch = {};
	/**
	 * add a watcher to the scope
	 * @param {string|function} path - path to watch or watch function
	 * @param {function} [fn] - watch function if path was provided
	 * @returns {function} unwatch - function to remove watcher
	 **/
	this.$watch = function(path, fn) {
		if(fn) (watch[path] || (watch[path] = [])).push(fn);
		else fn = path;
		queue.push(fn);
		return function() {
			var index = -1;
			if(typeof path !== 'function') {
				index = watch[path].indexOf(fn);
				if(index > -1) watch[path].splice(index, 1);
			}
			index = queue.indexOf(fn);
			if(index > -1) queue.splice(index, 1);
		};
	};
	/**
	 * Run all watchers for this scope and child scopes
	 * @param {string} [path] - watcher path to run
	 **/
	this.$apply = function (path) {
		if(!path) apply(this, queue);
		else apply(this,watch[path]);
		for (var i = 0; i < children.length; i++) children[i].$apply(path);
	};
	/**
	 * creates a new child Scope
	 * @returns {Scope} childScope
	 **/
	this.$new = function() {
		function ChildScope() {Scope.call(this);}
		ChildScope.prototype = this;
		var child = new ChildScope();
		return children.push(child),child;
	};
}
module.exports = Scope;