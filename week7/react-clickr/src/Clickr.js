import React from 'react';

class Clickr extends React.Component {

  state = {
    clickCounter: 0
  };


  handleClick = () => {
    console.log('handleClick():', this);
    const newClickCounter = this.state.clickCounter + 1;
    this.setState({ clickCounter: newClickCounter });
    this.props.onButtonClickHandler( newClickCounter );
  }


  render(){
    return (
      <div>

        <button onClick={ this.handleClick }>
          { this.props.buttonLabel }
        </button>
        <br/>
        Clicks: { this.state.clickCounter }

      </div>
    );
  } // render()

} // class Clickr

export default Clickr;
