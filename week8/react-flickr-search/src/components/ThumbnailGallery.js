import React from 'react';


const generateImageURL = (photo, size='q') => {
  return `https://farm${ photo.farm }.staticflickr.com/${ photo.server }/${ photo.id }_${ photo.secret }_${ size }.jpg`;
};

// class ThumbnailGallery extends React.Component {
  // render(){

const ThumbnailGallery = (props) => {
    return (
      <div>
        {
          props.photos.map( photo => (
            <img
              src={ generateImageURL(photo, 's') }
              alt={ photo.title }
              key={ photo.id }
            />
          ) )
          /*
          [
            <img src="http://..." alt="fish" key="33w4">,
            <img src="http://..." alt="boat" key="33w4">,
            <img src="http://..." alt="water" key="33w4">,
            <img src="http://..." alt="dogs" key="33w4">
          ]
          */
        }
      </div>
    );

  // } // render

}; // ThumbnailGallery()

 // class ThumbnailGallery


export default ThumbnailGallery;
