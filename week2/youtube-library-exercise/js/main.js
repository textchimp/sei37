
console.log('loaded!');


// Create an array of every link on the page using document.querySelectorAll( CSS-SELECTOR-GOES-HERE )
const links = document.querySelectorAll('.span3 a');

// Iterate through the array. In each iteration of the loop:
for( let i = 0; i < links.length; i++ ){


  const currentLink = links[i];
  console.log( currentLink );

  // Find the current href using element.href (assuming your variable is called element), and store into a variable
  // console.log( currentLink.href );
  const href = currentLink.href;

  // Generate a thumbnail URL using youtube.generateThumbnailUrl(videoUrl)
  const thumbnailURL = youtube.generateThumbnailUrl( href );
  console.log( thumbnailURL );

  // Create an IMG element using document.createElement(tagName)
  const imgTag = document.createElement('img');

  // Set the "src" of the IMG element using newImage.src = 'something'
  imgTag.src = thumbnailURL;

  // Append the IMG to the link using element.appendChild(element)
  currentLink.appendChild( imgTag );

} // for
