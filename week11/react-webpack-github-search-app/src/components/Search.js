import React from 'react';

class Search extends React.Component {

  state = {
    searchUsername: ''
  };

  // constructor(){
  //   this.handleInput = this.handleInput.bind(this);  // KILL ME
  // }

  handleInput = (ev) => {
    this.setState({  searchUsername: ev.target.value });
  }

  handleSubmit = () => {
    // console.log('clicked!', this);
    this.props.history.push(`/profile/${ this.state.searchUsername }`);
    // this.$router.push({ name: 'Profile', params: {} })   <-- Vue version
  }

  render(){
    return (
      <div>
        <label>Search by Username: </label>
        <input type="text" onChange={ this.handleInput } />
        <button onClick={ this.handleSubmit } >Search</button>
      </div>
    );
  }

} // Search

export default Search;
