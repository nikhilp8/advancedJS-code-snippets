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