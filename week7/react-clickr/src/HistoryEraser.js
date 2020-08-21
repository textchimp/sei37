import React from 'react';

import Clickr from './Clickr';

class HistoryEraser extends React.Component {

  // instead of constructor():
  // this is the ES6 JS way of creating instance
  // variables, just 'naked' in the class
  state = {
    historyStillExists: true,
    todoList: [
      { text: 'First' },
      { text: 'Second' },
      { text: 'Third' },
    ]
  };

  // This is our 'phone' for the child to call us back on
  respondToButtonClick = (count) => {
    console.log('HistoryEraser:respondToButtonClick()');
    console.log('Current count: ', count);
    console.log('this', this);

    if( count > 4 ){
      this.setState({ historyStillExists: false });
    }

  }


  render(){

    return (
      <div>
        <h2>HISTORY ERASER BUTTON YOU FOOL!!!</h2>

        {
          this.state.todoList.map( item => <p>{ item.text }</p> )
        }

        <p>
        {
          // Ternary expression: short version of if/else
          this.state.historyStillExists ?
          'All is well, history still exists.'
          :
          'YOU FOOL! YOU ERASED HISTORY!!!!$%%&*^'
        }
        </p>

       <Clickr
         buttonLabel="Maybe Erase History!!!"
         onButtonClickHandler={ this.respondToButtonClick }
        />

      </div>
    );
  } // render()

} // HistoryEraser

export default HistoryEraser;
