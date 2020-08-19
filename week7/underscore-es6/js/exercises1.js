
console.log('Exercises 1');

const numbers = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];

const people = [
  { id: 1, username: "A", active: true,  age: 20 },
  { id: 2, username: "B", active: false, age: 35 },
  { id: 3, username: "C", active: false, age: 50 },
  { id: 4, username: "D", active: true,  age: 65 },
  { id: 5, username: "E", active: true,  age: 80 },
  { id: 6, username: "E", active: true,  age: 95 },
];

// Iterate through numbers and log each number to the console
_(numbers).each( function( item ){
  console.log( item );
});

_(numbers).each( item => console.log(item) );

numbers.forEach( item => console.log(item) );

// Iterate through numbers and multiply each one of them by 5
numbers.forEach( num => console.log(num * 5) );

const timesFive = numbers.map( n => n * 5 );
console.log('timesFive', timesFive);

// Iterate through numbers and reduce it by adding them together
// const sum =  _(numbers).reduce( (total, num) => {
//   return total + num;
// });
const sum =  _(numbers).reduce( (total, num) => total + num );
console.log('sum', sum);

// Get an array of all of the people in people that have the username "E"
const ePeople = _(people).where({ username: 'E' });
console.log('ePeople', ePeople);

// ES6 vanilla JS version:
const ePeopleES6 = people.filter( p => p.username === 'E' );
console.log('ePeopleES6', ePeopleES6);

// Find the first object in people that has the id of 3
const idThree = _(people).findWhere({ id: 3 });
console.log('idThree', idThree);

const idThreeES6 = people.find( p => p.id === 3 );
console.log('idThreeES6', idThreeES6);

// Find the first person who has an age of less than 50
const youngster = people.find( p => p.age < 50 );
console.log('youngster', youngster);

// Get an array of all of the people with an age of over 60
const boomers = people.filter( p => p.age > 60 );
console.log('boomers', boomers);

// Remove all of the people with an age less than 40
const midlifes = people.filter( p => p.age >= 40 );
console.log('midlifes', midlifes);


const midlifesUnderscore = _(people).reject( p => p.age < 40 );
console.log('midlifesUnderscore', midlifesUnderscore);
