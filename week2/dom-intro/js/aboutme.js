
console.log('hi');

// (In JS) Change the body tag's style so it has a font-family of "Arial, sans-serif".
// document.querySelector('body')
document.body.style.fontFamily = 'Arial, sans-serif';

// (In JS) Replace each of the spans (nickname, favorites, hometown) with your own information.
const nicknameSpan = document.querySelector('#nickname');
// console.log(nicknameSpan);
nicknameSpan.innerHTML = 'Textchimp';

const favouritesSpan = document.querySelector('#favorites');
favouritesSpan.innerHTML = 'Ruby, Nookie, BBQs';

// one-liner:
document.querySelector('#hometown').innerHTML = 'Sydders';

// Iterate through each li and change the class to "listitem". Add a style tag that sets a rule for "listitem" to make the color red.

const allListItems = document.querySelectorAll('li');
// console.log(allListItems);
for( let i = 0; i < allListItems.length; i++ ){
  // console.log( allListItems[i] );
  allListItems[i].className = 'listitem';
}

// Create a new img element and set its src attribute to a picture of you. Append that element to the page.
const newImg = document.createElement('img');
newImg.src = 'http://www.fillmurray.com/400/200';
newImg.alt = 'Not really me, actually Bill';

document.body.appendChild( newImg );


/////////////////////////////////////////////////////////////////////////////

// Book List

var books = [
  {
    title: 'The Design of EveryDay Things',
    author: 'Don Norman',
    alreadyRead: false,
    imageURL: 'http://www.fillmurray.com/100/50'
  },
  {
    title: 'The Most Human Human',
    author: 'Brian Christian',
    alreadyRead: true,
    imageURL: 'http://www.fillmurray.com/60/30'
  }
];

// Keep track of which books you read and which books you want to read!
//
// Create a webpage with an h1 of "My Book List".
// Add a script tag to the bottom of the page, where all your JS will go.
//
// Iterate through the array of books. For each book, create a p element with the book title and author and append it to the page.

// This is where we will appendChild():
const booksDiv = document.querySelector('#books');

const ulTag = document.createElement('ul');

// for( let i = 0; i < books.length; i++ ){
//   const currentBook = books[i];
//   console.log( currentBook );
//   const bookPTag = document.createElement('p');
//   bookPTag.innerHTML = `"${ currentBook.title }" by ${ currentBook.author }`;
//   console.log(bookPTag.innerHTML);
//   // Add this detached DOM node to the actual page:
//   booksDiv.appendChild( bookPTag );
// }
for( let i = 0; i < books.length; i++ ){
  const currentBook = books[i];
  console.log( currentBook );
  const listItemTag = document.createElement('li');
  listItemTag.innerHTML = `"${ currentBook.title }" by ${ currentBook.author }`;

  const imgTag = document.createElement('img');
  imgTag.src = currentBook.imageURL;

  listItemTag.appendChild( imgTag ); // add the image tag to the li tag

  // Add this detached DOM node to the actual page:
  ulTag.appendChild( listItemTag );
}

booksDiv.appendChild( ulTag );

// Bonus: Use a ul and li to display the books.
// Bonus: add a property to each book with the URL of the book cover, and add an img element for each book on the page.
// Bonus: Change the style of the book depending on whether you have read it or not.
