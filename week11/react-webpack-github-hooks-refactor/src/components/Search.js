import React, { useState } from 'react';

// class Search extends React.Component {
//
//   state = {
//     searchUsername: ''
//   };
//
//   // constructor(){
//   //   this.handleInput = this.handleInput.bind(this);  // KILL ME
//   // }
//
//   handleInput = (ev) => {
//     this.setState({  searchUsername: ev.target.value });
//   }
//
//   handleSubmit = () => {
//     // console.log('clicked!', this);
//     this.props.history.push(`/profile/${ this.state.searchUsername }`);
//     // this.$router.push({ name: 'Profile', params: {} })   <-- Vue version
//   }
//
//   render(){
//     return (
//       <div>
//         <label>Search by Username: </label>
//         <input type="text" onChange={ this.handleInput } />
//         <button onClick={ this.handleSubmit } >Search</button>
//       </div>
//     );
//   }
//
// } // Search

const Search = (props) => {

  // in a class component:
  // state = {
  //   searchUsername: ''
  // }
  // We pass to useState the initial value we want for this state
  const [ searchUsername, setSearchUsername ] = useState('');


  const handleInput = (ev) => {
    setSearchUsername( ev.target.value );
  };

  const handleSubmit = () => {
    props.history.push(`/profile/${ searchUsername }`);
  };

  return (
    <div>
      <label>Search by Username: </label>
      <input type="text" onChange={ handleInput } />
      <button onClick={ handleSubmit }>Search</button>
      <p>
        Typed: { searchUsername }
      </p>
    </div>
  );

}; // Search()

export default Search;
