
import React from 'react';


class SecretsForm extends React.Component {

  state = {
    secret: ''
  };

  handleSubmit = (ev) => {
    ev.preventDefault();
    console.log( 'submit:', this.state.secret );

    // When the form is submitted, report back to the parent
    // the contents of the textarea, using the function passed
    // down from the parent as a prop called 'onSecretSubmit';
    // the textarea content is saved as a bit of state called 'secret',
    // so that is the argument to the parent's function, i.e.
    // that's how we actually send data to the parent
    this.props.onSecretSubmit( this.state.secret );
  }


  handleInput = (ev) => {
    // console.log( ev.target.value );
    this.setState({ secret: ev.target.value });
  }

  render(){

    return (
      <div>
        <form onSubmit={ this.handleSubmit }>
          <textarea onChange={ this.handleInput } />
          <br />
          <button>Share</button>
        </form>
      </div>
    );

  } // render

} // class SecretsForm


export default SecretsForm;
