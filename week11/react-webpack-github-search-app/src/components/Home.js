import React from 'react';
import { Link } from 'react-router-dom';

const Home = props => {

  // Functions can define other functions in them!
  // But remember that due to function scoping rules in JS,
  // any local variables (including variables containing functions)
  // are only visible within the parent function (i.e. not globally)
  const gotoRandomUserProfile = () => {
    console.log('Clicked!');
    props.history.push('/profile/textchimp'); // TODO: use random username
  };

  return (
    <div>
      <h1>GitHub Search</h1>
      <hr />

      <Link to="/search">
        <button>Search for a User</button>
      </Link>

      &nbsp;

      <button onClick={ gotoRandomUserProfile }>Random User</button>

    </div>
  );

};

export default Home;
