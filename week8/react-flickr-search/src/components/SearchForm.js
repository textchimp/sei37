import React from 'react';


class SearchForm extends React.Component {

  state = {
    searchQuery: ''
  };


  handleInput = (ev) => {
    // console.log( ev.target.value );
    this.setState({ searchQuery: ev.target.value });
  }


  handleSubmit = (ev) => {
    console.log('FORM SUBMITTED in <SearchForm>:handleSubmit()', this.state.searchQuery);
    ev.preventDefault(); // stop the form from submitting/reloading

    this.props.onSearch( this.state.searchQuery );

  }


  render(){
    return (
      <div>
        <form onSubmit={ this.handleSubmit }>
          <input type="text" onChange={ this.handleInput } />
          <input type="submit" value="Search" />
        </form>
        <hr />
      </div>
    );
  } // render

} // class SearchForm


export default SearchForm;
