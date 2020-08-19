
console.log('Hello Underscore!');

const bros = [ 'Groucho', 'Harpo', 'Chico' ];

// Style 1:
// _.each(bros, function(){} );

// Style 2:

_(bros).each( function( item, pos ){
  console.log(`Position: ${pos}, item: ${item}`);
});

// Underscore .each works for objects too:
const groucho = {
  name: 'Groucho',
  instrument: 'Guitar',
  vice: 'Cigars'
};

_(groucho).each( function( val, key ){
  console.log( key, val );
});


console.log('forEach: =====================');

// Vanilla JS: .forEach
bros.forEach( function( bro, index ){
  console.log( index, bro );
});

console.log('ES6 Arrow Functions!');

// Single argument with parentheses
bros.forEach( (bro) => {
  console.log( bro );
});

// Single argument without parentheses
bros.forEach( bro => {
  console.log( bro );
});

// Multiple arguments REQUIRE parentheses
bros.forEach( (bro, index) => {
  console.log( index, bro );
});

// No arguments still REQUIRE parentheses
bros.forEach( () => {
  console.log('Hello');
  return 'STUFF YAS'; // IGNORED by .forEach
});

// One-liner functions don't need curly brackets!
bros.forEach( bro => console.log(bro) );

// Creating named functions looks the same:
// const myFunc = function(){};
// const myFunc = ()=>{};

console.log('map ---------------------------');

const nums = [ 1, 2, 3, 4, 5 ];

// .map transforms an input array of values
//  into an output array of values, according
// to what your callback function returns
const output = _(nums).map( function( item ){
  console.log('Current item: ', item);
  const result = item * item;
  console.log('Result: ', result);
  return result;
});

console.log('Output of map:', output);

const output2 = _(nums).map( function(item){
  return item * item;
});

console.log('Short version output:', output2);

const hecticShortOutput = _(nums).map( item => item * item );
console.log('Hectic short output:', hecticShortOutput );

// Vanilla JS map:
const es6MapOutput = nums.map( item => item * item );
console.log('es6MapOutput:', es6MapOutput);

// How would you do a squaring (n * n) map manually?
// Use 'nums' as your input
const longWayOutput = [];
for( let i = 0; i < nums.length; i++ ){
  const item  = nums[i];
  const result = item * item;
  console.log( result );
  longWayOutput.push( result );
}
nums.forEach( function(item){
  const result = item * item;
  longWayOutput.push( result );
});

console.log('longWayOutput', longWayOutput);


console.log('reduce -----------------------------');
// const nums = [ 1, 2, 3, 4, 5 ];


const sum = _(nums).reduce( function( runningTotal, item ){
  console.log('runningTotal', runningTotal);
  console.log('item', item);
  return runningTotal + item;
});

console.log('sum of nums:', sum);

// Vanilla JS version:
const vanillaSum = nums.reduce( function( acc, item ){
  console.log('acc', acc);
  console.log('item', item);
  if( item % 2 === 0 ){
    acc[ item ] = 'even';
  } else {
    acc[ item ] = 'odd';
  }
  return acc;
}, {} );

console.log('vanillaSum', vanillaSum);


console.log('ActiveRecord-style Underscore methods');
// Methods for searching through data (usually an array of objects)

// Brother.all =>
const brothers = [
  { name: 'Groucho', instrument: 'guitar', vice: 'cigars',     age: 44, nums: [1,2,3,5] },
  { name: 'Harpo',   instrument: 'harp',   vice: 'mutism',     age: 42, nums: [1,2,3] },
  { name: 'Chico',   instrument: 'guitar', vice: 'infidelity', age: 39, nums: [1,2,3,5] }
];

// Like ActiveRecord's "Brother.find_by instrument: 'harp'"
const harpist = _(brothers).findWhere({ instrument: 'guitar', age: 39 });
console.log('harpist:', harpist);

// Vanilla JS equivalent: slightly different, you have to pass a test function,
// not an object; this makes it more versatile, because you can perform any
// kind of test
const es6Harpist = brothers.find( item => item.age < 40 );
console.log('es6Harpist', es6Harpist);

// ActiveRecord .where: "Brother.where instrument: 'guitar'"
const guitarists = _(brothers).where({ instrument: 'guitar' });
console.log('guitarists', guitarists);

// Vanilla JS equivalent: like .find, you have to give a test function
const es6Guitarists = brothers.filter( item => item.name.length < 6 );
console.log('es6Guitarists', es6Guitarists);

const es6GuitaristNames = brothers.filter( b => b.instrument === 'guitar' ).map( item => item.name );
console.log('es6GuitaristNames', es6GuitaristNames);

// Which brothers have 5 as a favourite number?
const fansOfFive = brothers.filter( bro => bro.nums.includes(5) );
console.log('fansOfFive', fansOfFive);
