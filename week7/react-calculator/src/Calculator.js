import React from 'react';

class Calculator extends React.Component {

  // Same as Ruby's 'initialize': it's the function
  // that is run when an object (instance) is created for
  // this class
  constructor(){
    // Call the constructor() function of the parent class
    // which is Component; required to give 'this' the correct
    // value, get props etc
    super();

    // Initialise the state for this component
    // (in Vue, this is called 'data')
    this.state = {
      firstNum: 0,
      secondNum: 0
    };

    // We need the correct value of 'this' inside the updateFirstNum() event handler, so we
    // can call this.setState() and keep track of the number that was typed in the form input.
    // But when you use a function as an event handler, it LOSES its original value for 'this'
    // (and that's core JS behaviour).
    // To force our event handler updateFirstNum() to remember the correct value of this, we have
    // to create a new version of it using .bind(), and the argument to bind() is what you want
    // the function to have as its 'this' value; here, we want it to have the same value of
    // 'this' which constructor() currently has, which is the correct value.
    this.updateFirstNum = this.updateFirstNum.bind( this );
    this.updateSecondNum = this.updateSecondNum.bind( this );
  }


  updateFirstNum( ev ){
    console.log('updateFirstNum()', ev.target.value );

    // YOU ARE NOT ALLOWED TO CHANGE this.state DIRECTLY:
    // this.state.firstNum = ev.target.value;

    // You have to use this.setState(), so React will notice
    // the change to the state data, and trigger render()
    this.setState({ firstNum: parseInt(ev.target.value) });
  }


  updateSecondNum( ev ){
    this.setState({ secondNum: parseInt(ev.target.value) })
  }


  render(){

    // const a = this.state.firstNum;

    return (
      <div>
        <h2>CalculatoReact</h2>

        <input type="text" placeholder="First Number" onChange={ this.updateFirstNum } />

        <input type="text" placeholder="Second Number" onChange={ this.updateSecondNum } />

        <h3>Results:</h3>

        { this.state.firstNum } + { this.state.secondNum } =
        {  this.state.firstNum + this.state.secondNum }
        <br/>

      { this.state.firstNum } - { this.state.secondNum } =
      {  this.state.firstNum - this.state.secondNum }
      <br/>

      { this.state.firstNum } * { this.state.secondNum } =
      {  this.state.firstNum * this.state.secondNum }
      <br/>

      { this.state.firstNum } / { this.state.secondNum } =
      {  this.state.firstNum / this.state.secondNum }
      <br/>


      </div>
    );
  } // render()

} // class Calculator

export default Calculator;
