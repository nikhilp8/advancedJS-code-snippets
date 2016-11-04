//osure is when a function remembers its lexical scope even when it's executed outside that scope

function foo(){
	var bar = 'bar';

	function baz() {
		console.log(this.bar);
	};

	bam(baz);
};
function bam(baz) {
	baz();				//bar
};
foo();

//another example

function foo(){
	var bar = 'bar';

	return function() {
		console.log(this.bar);
	
	};	
};

function bam() {
	foo()();			//bar
};

bam();

// another example

function foo() {
	var bar = "bar";

	setTimeout(function(){	// both have closure over the same function
		console.log(bar++);
	},100);

	setTimeout(function(){
		console.log(bar++);
	},200);

};
foo();	// 0 1

// This is a shared scope, simillarly we can have nested scope
function foo() {
	var bar = 0

	setTimeout(function(){
		var baz = 1;	                         
		console.log(bar++);

		setTimeout(function(){
		console.log(bar+baz);
		
	},200);
	},100);

};
foo();	// 1	2

//another example
for(var i = 0; i<=5; i++){
	setTimeout(function(){
		console.log("i" +i);	// 555555	all of them have access to the same global scope
	
	},i*1000);
}

for(var i = 0; i<=5; i++){

	(etTimeout(function(){
		console.log("i" +i);	//0112345	by placing an IIFE we are creating a separate scope
	
	},i*1000);)(i);
}
// Or can use let keyword isntead of var in for statement

// different module patterns---classic module pattern, es6 module pattern, ..