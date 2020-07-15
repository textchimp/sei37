
console.log('Hello DOM!');

// Get the element with id="narrow" (there should be only one!)
const narrowPara = document.getElementById('narrow');
console.log('narrow paragraph', narrowPara );

// Get all P tags and print them out
const allPTags = document.getElementsByTagName('p');
console.log('all P tags:', allPTags);

for( let i = 0; i < allPTags.length; i++ ){
  console.log( i, allPTags[i] );
}

// Get all tags which have class="special"
const allSpecialTags = document.getElementsByClassName('special');
console.log('all .special tags:', allSpecialTags);

// New HTML5 DOM Access methods - THANK YOU jQUERY FOR THE IDEA!

const narrowParaAgain = document.querySelector('#narrow');
console.log('#narrow para again:', narrowParaAgain );

const allLiTags = document.querySelectorAll('li');
console.log('all li tags:', allLiTags);

const allLinksInsidePTags = document.querySelectorAll('p a');
console.log('all links inside P tags:', allLinksInsidePTags);
