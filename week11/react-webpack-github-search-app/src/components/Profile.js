import React from 'react';
import axios from 'axios';
const GITHUB_BASE_URL = 'https://api.github.com/users';
const GITHUB_TOKENS = '?client_id=4ec1b8f9c149f7c46ffd&client_secret=a05ec287c29ebd9633131b5a08298530709130e9'

class Profile extends React.Component {

  state = {
    userInfo: {},
    userRepos: []  // the Ajax request will return an array we need to .map over
  };

  fetchGitHubInfo(){

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

  } //fetchGitHubInfo()


  // This method runs once when the component is added to the DOM
  componentDidMount(){
    console.log('Profile component mounted!');

    this.fetchGitHubInfo();

  } // componentDidMount()


  // This lifecycle method, if defined in your component class,
  // will be run whenever the component's props or state are
  // updated. The method will be passed the previous values
  // of props and state before they were updated. You will
  // probably need to compare the current values to the
  //  previous values!
  componentDidUpdate(prevProps, prevState){
    console.log('componentDidUpdate() ============================');

    // Check the *reason* that componentDidUpdate is running
    // right now - is it because the props we care about have
    // updated? Or is it something else, like state updating?
    if( prevProps.match.params.user !== this.props.match.params.user ){
      console.log('NOW WE ARE SETTING STATE');
      console.log('(i.e. it WAS the props that changed)');
      // this.setState({ userInfo: { name: 'test'} });
      this.fetchGitHubInfo();
    }
    // else {
    //   console.log('NOT setting state');
    //   console.log('(i.e. the props did not change, it was setState that triggered this componentDidUpdate() )');
    // }

  } // componentDidUpdate()



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
