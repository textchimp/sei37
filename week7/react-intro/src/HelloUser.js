import React from 'react';

const KittenImage = function( props ){
  return <img src={`http://placekitten.com/${ props.width}/${ props.height }`} />;
};

class HelloUser extends React.Component {

  render(){

    return (
      <div>
        <h3>Hello, { this.props.name }</h3>
        <KittenImage
          width= { this.props.imgWidth  }
          height={ this.props.imgHeight }
        />
      </div>
    );

  } // render()

}; // class HelloUser

export default HelloUser; // make available to 'import'
