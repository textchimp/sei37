import React from 'react';
import axios from 'axios';

import SecretsForm from './SecretsForm';

const SECRETS_URL = 'http://localhost:3000/secrets';

class Secrets extends React.Component {

  state = {
    secrets: []
  };


  saveSecret = (secret) => {
    console.log('<Secrets>:saveSecret():', secret);

    // Save this new secret to the backend, via Ajax
    axios.post( SECRETS_URL, { content: secret } )
    .then(  res => {
      console.log('response: ', res.data);

      // Add the new secret to state, which will cause it
      // to appear on the page

      // NOT ALLOWED!
      // this.state.secrets.push( res.data );

      // You have to make a copy of the state array,
      // ideally using spread (...), and add your new
      // data to it, and save THAT copy back into state
      this.setState({
        secrets: [ ...this.state.secrets, res.data ]
      });

    })
    .catch( err => console.warn(err) );

  } // saveSecret()


  fetchSecrets = () => {

    // Load the list of current secrets from the backend
    axios.get( SECRETS_URL )
    .then( res => {
      console.log(res.data);
      this.setState({ secrets: res.data });
    })
    .catch( err => console.warn(err) );

  } // fetchSecrets()


  // Like jQuery's $(document).ready
  componentDidMount(){
    console.log('LOADED.');

    this.fetchSecrets();
    setInterval( this.fetchSecrets, 1000 );

  } // componentDidMount()


  render(){

    return (
      <div>
        <h1>Spill Yer Guts</h1>

        <SecretsForm onSecretSubmit={ this.saveSecret }  />

        <hr/>
        <h3>Terrible Secrets of the General Public</h3>
        {
          this.state.secrets.reverse().map( s => <div className="secret" key={ s.id }>{ s.content }</div> )
        }

      </div>
    );

  } // render()

} // class Secrets


export default Secrets;
