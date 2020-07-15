
console.log('Hello events!');

// Review of functions

// Functions are "first-class" in Javascript - they live inside variables!
const sayHello = function(){
  console.log('Oh, hello!');
  return true;
};


// Write a function that will run ANOTHER function for us, but "nicely"
// This means that this function TAKES A FUNCTION AS AN ARGUMENT <exploding-brain.gif>
const runNicely = function( functionToRunNicely ){
  console.log('Hello, I am about to run your function for you! I hope that is to your liking sir/madam!');

  console.log('functionToRunNicely is:', functionToRunNicely);
  functionToRunNicely(); // Run the function that was passed in to runNicely as an argument

  console.log('I hope that went well for you! It was a real pleasure for me, and have a nice day.');
}; // runNicely()

// Giving runNicely a pre-defined function (it's already in a variable)
runNicely( sayHello ); // Give runNicely the DEFINITION of sayHello, don't RUN sayHello()

// Giving runNicely an "anonymous"/"inline" function to run
runNicely( function(){
  console.log('Hello from this on-the-fly function!');
} );

// Select an element:
const h1 = document.querySelector('h1');

// Attach an event-handling function (callback) to that element...
// Our callback function CAN ITSELF TAKE AN ARGUMENT! The browser
// will supply the value for this argument when it calls our function
// in response to the requested event ('click') happening. The event
// argument will be an object containing lots of information about the
// specific event.
h1.addEventListener( 'click', function( event ){
  console.log('<h1> click event handler function running! Event data:', event);
});
