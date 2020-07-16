
console.log('jQuery solution');

// Create an array of every link on the page using document.querySelectorAll( CSS-SELECTOR-GOES-HERE )
// Iterate through the array. In each iteration of the loop:
// Find the current href using element.href (assuming your variable is called element), and store into a variable
// Generate a thumbnail URL using youtube.generateThumbnailUrl(videoUrl)
// Create an IMG element using document.createElement(tagName)
// Set the "src" of the IMG element using newImage.src = 'something'
// Append the IMG to the link using element.appendChild(element)

// Get all the <a> tags that are on the page
const $allLinkTags = $('.span3 a');
console.log( $allLinkTags );

// $allLinkTags.html('CHANGED!'); // implicit iteration

$allLinkTags.each( function(){
  // 'this' contains the current element... as a vanilla DOM node (NOT jQuery)
  // console.log( this );
  $(this).html('CHANGED');  // turn 'this' into a jquery object!

  const $currentLink = $(this); // make a convenient variable

  const linkHref = $currentLink.attr('href');  // this.href
  // console.log( linkHref );

  const thumbnailURL = youtube.generateThumbnailUrl( linkHref );
  // console.log( 'thumbnail URL:', thumbnailURL );

  // Make a new image tag, set the src attribute to be the thumbnail URL
  // and append the image to the end of the link tag
  const $imgTag = $('<img>');
  $imgTag.attr('src', thumbnailURL); // gives us <img src="http://ytimg....">
  $currentLink.append( $imgTag );

});
