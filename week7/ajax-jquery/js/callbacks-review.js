
// console.log('Welcome to Callback Hell.');
//
const sayHello = function(){
  console.log('Hello!');
};

// "Run the sayHello function for me, AFTER 1000 ms have elapsed"
// setTimeout( sayHello, 1000 );

// Pass an anonymous function to setTimeout to run
// after 1000ms has elapsed
// setTimeout( function(){
//   console.log('Hello!');
// }, 1000 );

const runSomeFunctionFiveTimes = function( fnToRun ){
  console.log('fnToRun:', fnToRun);
  for( let i = 0; i < 5; i++ ){
    console.log( `Run number ${ i+1 }:` );
    fnToRun(); // Run the function passed in as an arg
  } // for

};


const a = ['one', 'two', 'three'];


const each = function( array, fnToApply ){

  // Loop over the array (1st argument)
  for( let i = 0; i < array.length; i++ ){
    const currentItem = array[i];
    fnToApply( currentItem, i );
  }

}; // each()


// we can't write a.each(fn), we need to do each(a, fn)
each(a, function(item, index){
  console.log( 'callback function running', item);
  console.log('index is:', index);
  console.log('-------------------------------');
});


// Reminder: in Ruby:
// a.each do |item|
//   puts item
// end
