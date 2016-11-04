// every single object is created by a constructor function
// each time a constructor is called a new object is created
// A constructor makes an object linked to its own prototype

function Foo(who) {
	this.me = who;
}

var a1 = new Foo('a1');
var a2 = new Foo('a2');

Foo.prototype.identify = function() {
	return 'I am' + this.me	
};

a2.speak = function() {
	alert('hello'+this.identify());
};

a1.constructor === Foo;
a1.constructor === a2.constructor;
a1.__proto__ === Foo.prototype;
a1.__proto__ === a2.__proto__;		// call it as dunder proto instead of underscore underscore proto

// the dunder proto property is not seen on a1, so it checks on Foo.prototype, its not there, so it checks on Object.prototype & it has this
// its not a property but a getter function

a1.__proto__ === Object.getPrototypeOf(a1);	// es5
a1.__proto__ === a1.constructor.prototype;	// pre es5 like in es3

// the objects a1 & a2 can delegate to a different object for a method call
// So even if we creat 100's of objects like a1, a2 and try to access functions like identify we still have the 
// this reference to that respective object and that's what we wanted

If we want to make a child class to Foo
Function Bar() {

}

Bar.prototype = new Foo() 	// this is not ideal because we are also calling the constructor properties like 'me'

Bar.prototype = Object.create(Foo.prototype);	// this is preferred, it creates a new object & links to Foo.prototype

b1 = new Bar();
b1.identify()	// it first checks b1, then Bar.prototype, then Foo.prototype & it finds that property here
