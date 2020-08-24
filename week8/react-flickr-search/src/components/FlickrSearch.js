
import React from 'react';
import axios from 'axios';

// Import the child components which this component will be using
import SearchForm from './SearchForm';
import ThumbnailGallery from './ThumbnailGallery';

const BASE_URL = 'https://api.flickr.com/services/rest';
const API_KEY = '2f5ac274ecfac5a455f38745704ad084';


class FlickrSearch extends React.Component {

  state = {
    // Initialise to empty array, or you'll get errors
    // when you try to .map() it, because there will
    // be at least one render() that happens before
    // your AJAX response arrives and changes
    // this piece of state to the correct array
    photos: [],
    resultCount: 0
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
    // axios.get('http://localhost:3000/dogs')
    // .then( res => {
    //   console.log('server response:', res.data);
    //   this.setState({ dogs: res.data });
    // })
    // .catch( err => console.warn(err) );

  }

  performSearch = (query) => {
    console.log('<FlickrSearch>:performSearch()', query);

    const flickrParams = {
      api_key: API_KEY,
      method: 'flickr.photos.search',
      text: query,
      format: 'json',
      nojsoncallback: 1,
      page: 1 // or other page number
    };
    // this will be used to construct a querystring, as in getJSON()

    axios.get(BASE_URL, { params: flickrParams })
    .then( res => {
      console.log('server response:', res.data);
      this.setState({ photos: res.data.photos.photo });
      this.setState({ resultCount: res.data.photos.total });
    })
    .catch( err => console.warn(err) );

  } // performSearch

  render(){

    return (
      <div className="App">
        <h1>Flickr Search</h1>

        <SearchForm onSearch={ this.performSearch } />

        {
          this.state.resultCount.length > 0
          &&
          <p>Total Results: { this.state.resultCount }</p>
        }

        {
          // expressions only! (inside {} tags)
          // We can replace an if-statement with '&&', because it's an expression
          (this.state.photos.length > 0)
          &&
          <ThumbnailGallery photos={ this.state.photos } />
        }

      </div>
    );

  } // render()

} // class FlickrSearch


export default FlickrSearch;
