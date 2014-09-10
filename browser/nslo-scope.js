!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var o;"undefined"!=typeof window?o=window:"undefined"!=typeof global?o=global:"undefined"!=typeof self&&(o=self),o.nsloScope=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{}]},{},[1])(1)
});
//# sourceMappingURL=nslo-scope.js.map