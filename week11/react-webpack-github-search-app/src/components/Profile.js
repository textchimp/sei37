import React from 'react';
import axios from 'axios';
const GITHUB_BASE_URL = 'https://api.github.com/users';
const GITHUB_TOKENS = '?client_id=4ec1b8f9c149f7c46ffd&client_secret=a05ec287c29ebd9633131b5a08298530709130e9'

class Profile extends React.Component {

  state = {
    userInfo: {},
    userRepos: []  // the Ajax request will return an array we need to .map over
  };

  // This method runs once when the component is added to the DOM
  componentDidMount(){
    console.log('Profile component mounted!');

    const infoUrl = `${ GITHUB_BASE_URL }/${ this.props.match.params.user }${ GITHUB_TOKENS }`;
    axios.get(infoUrl)
    .then( res => {
      console.log( 'user data:', res.data );
      this.setState({ userInfo: res.data });
    })
    .catch( err => console.warn(err) );

    const reposUrl = `${ GITHUB_BASE_URL }/${ this.props.match.params.user }/repos${ GITHUB_TOKENS }`;
    axios.get(reposUrl)
    .then( res => {
      console.log( 'user repos:', res.data );
      this.setState({ userRepos: res.data });
    })
    .catch( err => console.warn(err) );


  } // componentDidMount()

  render(){

    const { html_url, name, public_repos, followers } = this.state.userInfo;
    // const html_url = this.state.userInfo.html_url;

    return (
      <div>
        <h2>Profile of { this.props.match.params.user }</h2>

        <div className="info">
          <strong>Home page:</strong> <a href={ html_url}>{ html_url}</a>
          <br />
          <strong>Repos:</strong> { public_repos }
          <br />
          <strong>Followers:</strong> { followers }
        </div>


        <div className="repos">
          <ul>
            {
              this.state.userRepos.map( r => <li>{ r.name }</li> )
            }
          </ul>
        </div>

      </div>
    );
  }

} // Profile

export default Profile;
