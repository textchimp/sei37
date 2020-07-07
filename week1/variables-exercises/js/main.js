
console.log( 'Hello World!' );

// CMD + /   - comment/uncomment the current line or selected text

// The Fortune Teller
// Why pay a fortune teller when you can just program your fortune yourself?
//
// Store the following into variables: number of children, partner's name, geographic location, job title. Output your fortune to the screen like so: "You will be a X in Y, and married to Z with N kids."


console.log('Fortune Teller');

const numberOfChildren = 8;
const partnersName = 'Craigsy';
const geographicLocation = 'Glasgow';
const jobTitle = 'chimney sweep';

// const output = 'You will be a ' + jobTitle + ' in ' + geographicLocation + ', and married to ' + partnersName + ' with ' + numberOfChildren + ' kids.';

// Interpolation
const output = `You will be a ${jobTitle} in ${geographicLocation}, and married to ${partnersName} with ${numberOfChildren} kids.`;

console.log( output );


// The Age Calculator
// Forgot how old someone is? Calculate it!
//
// Store the current year in a variable.
// Store their birth year in a variable.
// Calculate their 2 possible ages based on the stored values.
// Output them to the screen like so: "They are either NN or NN", substituting the values.


console.log('Age Calculator');

const currentYear = 2020;
const birthYear = 1980;

const ageAfterBirthday  = currentYear - birthYear;
const ageBeforeBirthday = ageAfterBirthday - 1;  // less repetitive! DRY: Don't Repeat Yourself

const ageOutput = `You are either ${ageBeforeBirthday} or ${ageAfterBirthday} years old.`;

console.log( ageOutput );


// The Lifetime Supply Calculator
// Ever wonder how much a "lifetime supply" of your favorite snack is? Wonder no more!
//
// Store your current age into a variable.
// Store a maximum age into a variable.
// Store an estimated amount per day (as a number).
// Calculate how many you would eat total for the rest of your life.
// Output the result to the screen like so: "You will need NN to last you until the ripe old age of X".

console.log('Lifetime Supply Calculator');

const currentAge = 60;
const maximumAge = 90;
const amountPerDay = 5;

const yearsRemaining = maximumAge - currentAge;
const amountPerYear = amountPerDay * 365.25;
const totalSnacksRequired = amountPerYear * yearsRemaining;

console.log( `You will need a total of ${totalSnacksRequired} to last you until the ripe old age of ${maximumAge}.` );


// The Geometrizer
// Calculate properties of a circle, using the definitions here.
//
// Store a radius into a variable.
// Calculate the circumference based on the radius, and output "The circumference is NN".
// Calculate the area based on the radius, and output "The area is NN".

console.log('Geometrizer');

const radius = 10;
const circumference = 2 * Math.PI * radius;
const area = Math.PI * radius ** 2;
console.log(`The circumference is `, circumference); // Multiple arguments to console.log
console.log(`The area is ${ area.toFixed(2) }`);

// The Temperature Converter
// It's hot out! Let's make a converter based on the steps here.
//
// Store a celsius temperature into a variable.
// Convert it to fahrenheit and output "NN°C is NN°F".
// Now store a fahrenheit temperature into a variable.
// Convert it to celsius and output "NN°F is NN°C."

console.log('Temperature Converter');

let celsiusTemp = 47;
let fahrenheitTemp = (celsiusTemp * 1.8) + 32;
console.log(`${celsiusTemp}°C is ${ fahrenheitTemp.toFixed(2) }°F.`);

fahrenheitTemp = 116.6;
celsiusTemp = (fahrenheitTemp - 32) / 1.8;
console.log(`${fahrenheitTemp}°F is ${celsiusTemp}°C.`);
