//
// The Fortune Teller
// Why pay a fortune teller when you can just program your fortune yourself?
//
// Store the following into variables: number of children, partner's name, geographic location, job title. Output your fortune to the screen like so: "You will be a X in Y, and married to Z with N kids."
//
// const numberOfChildren = 8;
// const partnersName = 'Craigsy';
// const geographicLocation = 'Glasgow';
// const jobTitle = 'chimney sweep';
//
// // const output = 'You will be a ' + jobTitle + ' in ' +  geographicLocation + ', and married to ' + partnersName + ' with ' + numberOfChildren + ' kids.';

// ES6 backtick string interpolation
// const output = `You will be a ${jobTitle} in ${geographicLocation}, and married to ${partnersName} with ${numberOfChildren} kids.`;

// console.log( output );
//
// Write a function named tellFortune that:
//
// takes 4 arguments: number of children, partner's name, geographic location, job title.
// returns a string that looks like this: "You will be a X in Y, and married to Z with N kids."
// Call that function 3 times with 3 different values for the arguments; each time you call the function, capture the return value of the function (the string) in a new variable, and on a new line, print out the contents of the variable


const tellFortune = function( numKids, partnersName, geographicLocation, jobTitle ){
  const output = `You will be a ${jobTitle} in ${geographicLocation}, and married to ${partnersName} with ${numKids} kids.`;
  return output;
};

const fortune1 = tellFortune(2, 'Debbie', 'Hawaii', 'pro surfer');
const fortune2 = tellFortune(5, 'Clarence', 'Ulan Bator', 'miner');
const fortune3 = tellFortune(1, 'Davo', 'Ipswitch', 'dancer');

console.log(fortune1);
console.log(fortune2);
console.log(fortune3);

// The Lifetime Supply Calculator
// Ever wonder how much a "lifetime supply" of your favorite snack is? Wonder no more!
//
// Write a function named calculateSupply that:
//
// takes 2 arguments: age, amount per day.
// calculates the amount consumed for rest of the life (based on a fixed maximum age).
// returns a string that looks like this: "You will need NN to last you until the ripe old age of X"
// Call that function 3 times with 3 different values for the arguments; each time you call the function, capture the return value of the function (the string) in a new variable, and on a new line, print out the contents of the variable
// Bonus: Accept floating point values for amount per day, and round the result to a round number.

const calculateSupply = function( age, amountPerDay ){
  const expectedLifespan = 90;
   const yearsRemaining = expectedLifespan - age;
   const amountPerYear = amountPerDay * 365.25;
   const totalSnacksRequired = yearsRemaining * amountPerYear;

   return `You will need ${totalSnacksRequired} to last you until the ripe old age of ${expectedLifespan}.`;
};

const snacks1 = calculateSupply( 80, 5 );
console.log('When you are 80 and need 5 snacks per day: ', snacks1);


// The Geometrizer
// Create 2 functions that calculate properties of a circle.
//
// Create a function called calcCircumference:
//
// Pass the radius to the function.
// Calculate the circumference based on the radius, and return this value from the function (as a number, not a string).
// Call the function with a radius argument of your choice, capture the return value in a variable, and use the variable to print out a string like: "The circumference of the circle is XX."
// Create a function called calcArea:
//
// Pass the radius to the function.
// Calculate the area based on the radius, and return this number from the function.
// Call the function with a radius argument, capture its return value in a variable, and use the variable to output to the consle "The area is NN".

const calcCircumference = function( radius ){
  return 2 * Math.PI * radius;
};

const calculateArea = function( radius ){
  return Math.PI * radius**2;
};

const circumference = calcCircumference( 10 );
console.log(`When the radius is 10, the circumference is ${circumference.toFixed(2)} units.`);

const area = calculateArea( 10 );
console.log(`When the radius is 10, the area is ${area.toFixed(2)} units².`);



// The Temperature Converter
// It's hot out! Let's make a converter.
//
// Create a function called celsiusToFahrenheit which:
//
// Takes a celsius temperature as its argument.
//
// Converts it to fahrenheit and returns this value from the function
//
// Call the funtion this way:
//
// Create a variable called celsius and store a temperature value in it
// Call the celsiusToFahrenheit function and pass the celsius variable as the argument.
// Capture the return value of the function into a new variable, and use both this variable and your original celsius input variable to print out a result like "XX°C is YY°F".
// Now do the reverse calculation by creating a function called fahrenheitToCelsius. Pass a variable called fahrenheit into this function when you call it.
//
// BONUS: prompt the user for the temperatures to convert, instead of hardcoding them into variables.


const celsiusToFahrenheit = function( celsius ){
  return (celsius * 1.8) + 32;
};

const fahrenheitToCelsius = function( fahrenheit ){
  return (fahrenheit - 32) / 1.8;
};

const celsiusTemp = 47;
const fahrenheitTemp = celsiusToFahrenheit( celsiusTemp );
console.log(`${celsiusTemp}°C is equal to ${fahrenheitTemp.toFixed(1)}°F.`);

const newCelsiusTemp = fahrenheitToCelsius( fahrenheitTemp );
console.log(`${ fahrenheitTemp.toFixed(1) }°F is equal to ${ newCelsiusTemp.toFixed(1) }°C.`);


//
// fahrenheitTemp = 116.60;
// celsiusTemp = (fahrenheitTemp - 32) / 1.8;
// console.log(`${fahrenheitTemp}˚F is ${celsiusTemp.toFixed(2)}˚C.`);
