
import React from 'react';
import axios from 'axios';

class FlickrSearch extends React.Component {

  state = {
    // Initialise to empty array, or you'll get errors
    // when you try to .map() it, because there will
    // be at least one render() that happens before
    // your AJAX response arrives and changes
    // this piece of state to the correct array
    dogs: []
  };

  // This method MUST have this name, and it runs
  // when the component has been added to the DOM.
  // Before this point, it's not safe to make
  // AJAX requests, or do anything that might
  // update state (and therefore update the DOM)
  //
  //
  // This is called a React 'lifecycle method', and
  // there are others that fire at other points:
  // componentDidUpdate()
  //  - fires whenever a components props or state changes
  // componentWillUnmount()
  //  - fires when a component is about to be removed
  //    from the DOM; you can cleanup streaming
  //    subscriptions or other event handlers here
  componentDidMount(){
    // Kind of the equivalent of $(document).ready()
    console.log('FlickrSearch MOUNTED.');

    // Make an AJAX request
    // Axios uses JS 'promises': they are then-able
    axios.get('http://localhost:3000/dogs')
    .then( res => {
      console.log('server response:', res.data);
      this.setState({ dogs: res.data });
    })
    .catch( err => console.warn(err) );

  }


  render(){

    console.log('dogs:', this.state.dogs);

    return (
      <div className="App">
        <h1>Flickr Search</h1>
        <h3>All Dogs</h3>
        <ul>
        {
          this.state.dogs.map( dog => {
            return <li key={ dog.id }>{ dog.name }</li>;
          }) // map
        }
        </ul>
      </div>
    );

  } // render()

} // class FlickrSearch


export default FlickrSearch;
