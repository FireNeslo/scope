var Scope = require('..');
var expect = require('chai').expect;
var queue, children, watch;
var scope;
var child;

function watcher(scope) {
  scope.watched.parent = !scope.child;
}
function extraWatcher(scope) {
  scope.watched.child = scope.child;
}

describe('Scope', function(){
  it('should work as a constructor', function() {
    expect(new Scope()).to.be.an.instanceof(Scope);
  })
  it('should work as a function', function() {
    expect(Scope()).to.be.an.instanceof(Scope);
  })
  it('should work as a mixin', function() {
    var object = {}; Scope.call(object);
    expect(object.$watch).to.be.an.instanceof(Function);
    expect(object.$apply).to.be.an.instanceof(Function);
    expect(object.$new).to.be.an.instanceof(Function);
  })

  beforeEach(function(){
    queue    = [];
    children = [];
    watch    = {};
    scope    = new Scope(queue,children, watch);
    child    = scope.$new();
    scope.watched = {};
    scope.child = false;
    child.child = true;
  });

  describe('#$watch(path, fn)', function(){
    it('should return a working unwatch function', function(){
      var unwatch = scope.$watch('path',watcher);
      expect(unwatch).to.be.an.instanceof(Function);
      expect(queue.length).to.equal(1);
      expect(watch.path.length).to.equal(1);
      unwatch();
      expect(queue.length).to.equal(0);
      expect(watch.path.length).to.equal(0);
      unwatch();
      expect(queue.length).to.equal(0);
      expect(watch.path.length).to.equal(0);
      unwatch = scope.$watch(watcher);
      expect(queue.length).to.equal(1);
      unwatch();
      expect(queue.length).to.equal(0);
      unwatch();
      expect(queue.length).to.equal(0);
    });
    it('should add watch function to queue', function(){
      expect(queue.length).to.equal(0);
      scope.$watch(watcher);
      expect(queue.length).to.equal(1);
    });
    it('should add watch function to queue and path', function(){
      expect(queue.length).to.equal(0);
      expect(watch.path).to.equal(undefined);
      scope.$watch('path',watcher);
      expect(queue.length).to.equal(1);
      expect(watch.path.length).to.equal(1);
    })
  });

  describe('#$apply(path)', function(){
    beforeEach(function(){
      scope.$watch(watcher);
      child.$watch('path',extraWatcher);
    });
    it('should run all watchers', function(){
      scope.$apply();
      expect(scope.watched.parent).to.equal(true);
      expect(scope.watched.child).to.equal(true);
    });
    it('should run child watchers', function(){
      child.$apply();
      expect(scope.watched.parent).to.equal(undefined);
      expect(scope.watched.child).to.equal(true);
    });
    it('should run watchers for path', function(){
      scope.$apply('path');
      expect(scope.watched.parent).to.equal(undefined);
      expect(scope.watched.child).to.equal(true);
    });
  });

  describe('#$new()', function(){
    it('should add a new child to parent', function(){
      expect(children.length).to.equal(1);
      scope.$new();
      expect(children.length).to.equal(2);
    });
    it('should inherit from parent', function(){
      expect(child.__proto__).to.equal(scope);
      expect(child).to.be.an.instanceof(Scope);
    });
  });
});