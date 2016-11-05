setTimeout(function(){
	console.log("calback");
},1000);

//call back hell
setTimeout(function(){
	console.log("one");
	setTimeout(function(){
		console.log("two");
		setTimeout(function(){
			console.log("three");
			setTimeout(function(){
				console.log("four");
				},1000);
			},1000);
		},1000);
},1000);

//the same output can be presented in a different way

function one(cb) {
	console.log("one");
	setTimeout(cb,1000);
};
function two(cb) {
	console.log("two");
	setTimeout(cb,1000);
};
function three(cb) {
	console.log("three");
	setTimeout(cb,1000);
};
function four(cb) {
	console.log("four");
	setTimeout(cb,1000);
};

one(two){
	two(three);
	four();
};
// the same code but without indentation, this code is susceptible to callback hell as the previous code.
// So callback hell is something more than the indentation and nesting

// These are the things people tried to do to solve callback problems to implement callback as a continuation style

function trySomething(ok,error) {
	setTimeout(function(){
		var num = Math.random();
		if(num>0.5) ok(num);
		else	error(num);
	},1000);
}

trySomething(
	function(num){
		console.log("success");
}, function(num){
		console.log("failure");
});

// another style is error-first code or node-style code

function trySomething(cb) {
	setTimeout(function(){
		var num = Math.random();
		if(num>0.5) cb(null,num);
		else	error("too low");
	},1000);
}

trySomething(function(err,num){
	if(err){
		console.log(err);
	}
	else {
		console.log("success");
	}
});

// trying to present asynchronous looking code in a synchronous fashion

// generator is a function which can be paused in the middle & can be resumed later

function* gen(){
	console.log("one");
	yield null;
	console.log("two");
};

var it = gen();	// when we call a generator function, it actually calls a iterator to control the operation of generator for us. Now when I call the function I didn't execute any code yet
it.next();	// "one"	when I call next, it runs the program till it sees a yield
it.next();	// "two"

// Promises

function getData(d){
	return new Promise(function(resolve,reject) {
		setTimeout(function(){resolve(d);},1000);
	})
};

getData(10)
	.then(function(num1){
		var x = 1+num1;
		return getData(30);
	})
	.then(function(num2){
		var y = 1+num2;
		return getData("sum :"+ x+y);
	})
	.then(function(answer){
		console.log(answer);	//sum: 42
	});