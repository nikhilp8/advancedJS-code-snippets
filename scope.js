// scope ---> where to look for things
// before es6, JS has function scope and global scope,block scope(possible only through try,catch ). As of es6 we have block scope also

// Compilation phase: The compiler engine does a initial pass of the code looking for variable and function declarations
// Execution phase: assigns values to variables & executes function calls

var foo = 'bar';

function bar() {	
	var foo='baz';
};

function baz(foo) {
	foo = "bam";
	bam = "yay";
};

// for the above code
// 1. compilation phase -- declare global variable foo, function declaration 'bar' with variable 'foo' in 'bar' scope,
//  function declaration of baz, variable foo in baz scope
// 2. execution phase -- couple of microseconds later, now there will be no var terms. assign 'bar' to foo,'baz' to foo
// in 'bar' scope, assign local variable foo with bam value,(as its declared in arguments) declare bam as global variable and assign 'yay' (since there is no
// 	var keyword engine automatically declares it as global as it could not find it in baz scope. In strict mode it's value will be undefined)

var foo = 'bar';

function bar() {	
	var foo='baz';

	function baz(foo) {
	foo = "bam";
	bam = "yay";
	};

	baz();
};

bar();	// executes function baz
foo;	// bar
bam;	// yay
baz();	// reference error, unlike for undeclared variables, it creates global variables while executing
		// but not for functions

var foo = function bar() {	// function expression
	var foo='baz';

	function baz(foo) {
	foo = "bar";
	foo;
	};

	baz();
};

foo();
bar();	// error

// if function is the very first word in the statement then its function declaration
// Usually function expressions seen with anonymous functions, but it's a good practice to give them a name as it helps in debugging
// The function bar() has its own scope and when called outside we get a reference error. This is the difference between a 
// function declaration and function expression. By giving it a name we can refer ourselves inside the function...for like recursion

//Hoisting

a;
b;
var a = b;
var b = 4;
b;
a;

//this code is compiled and executed in this order
var a;
var b;
a=b;
b=4;
a;
b;
b;
a;

//This moving of declarations to the top is called hoisting

var a = b;
var c = d;
a;
c;
function b(){

};
var d = function() {

};

// The above code becomes as shown below. Functions get moved to the top first followed by variable declaration

function b(){

};
var a;
var c;

var d;
a=b;
c=d;
a;
c;
d=function(){

};

//An example to show that functions get hoisted first

foo();
var foo =2;
function foo(){
	console.log('bar');

};
function foo() {
	console.log('foo');
};
//This becomes
function foo(){console.log('bar')};
function foo(){console.log('foo')};	// replaces the previous function, functions are over riden but not variables (strange)
var foo;	// ignored declaration because there's already a variable called foo
foo=2;
foo();	// 'foo'

//This keyword
// every function while executing has a reference to its execution context called this
// execution context depends on where the function is called & how its called. It all depends on callsite. Its the place where the function is executed
// There are 4 rules.
// 4th) Default binding rule
// 'this' refers to an object
// 3rd) implicit binding rule

function foo() {
	console.log(this.bar);
};
var bar = 'bar1';
var o2 = {
	bar:'bar2'
	foo: foo
}
var o3 = {
	bar:'bar3'
	foo: foo
}
foo();		//bar1	// 4th rule
o2.foo();	//bar2	// 3rd rule
o3.foo();	//bar3	// 3rd rule

//                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
//If we are in strict mode, 'this' is undefined. In non-strict mode it is global object

var o1 = {
	bar:'bar1',
	foo: function() {
		console.log(this.bar)
	}
}
var o2 = {bar:'bar2',foo:o1.foo}	
var bar ='bar3';
var foo = o1.foo;

o1.foo();	//bar1
o2.foo();	//bar2
foo();		//bar3

//2nd rule: explicit binding rule. If you use .call() or .apply() at call site, this refers to that object

function foo() {
	console.log(this.bar);
}

var bar = 'bar1';
var obj = {bar:'bar2'}

foo();			//bar1
foo.call(obj);	//bar2

//another example

function foo() {
	console.log(this.bar);
};
obj = {bar:'bar1'};
obj2 = {bar:'bar2'};

var orig = foo;
var foo = function() {orig.call(obj)};

foo();				//bar1
foo.call(obj2);		//bar1, here the 'this' keyword is hardcoded both at call site and inside. Should see what's inside the wrapper

//1st rule: new keyword
// // If you place new keyword infront of any function call it becomes constructor call.
// 4 things occur when we put 'new' in front of the function call
// 1. a new empty object is created
// 2. object gets linked to a different object (prototype stuff)
// 3. this new object becomes 'this' reference to the function call 
// 4. if the function doesn't return anything, it will implicitly insert a return 'this'

function foo(){
	this.baz = 'baz';	// empty object.baz = 'baz'
	console.log(this.bar +" " + baz);	// undefined undefined
			// there is no property of bar in empty object & at the moment baz variable exists but no values is assigned to it, so becomes undefined
			// returns the object now
}
var bar = 'bar';
var baz = new foo();	// creates a new empty object

// console.log(baz.baz)	// 'baz'	because the object is returned and had baz property