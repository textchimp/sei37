import React from 'react';


class ProcedureSearchResults extends React.Component {

  render(){
    return (
      <div>
        <h2>You searched for: "{ this.props.match.params.query }"</h2>
      </div>
    );
  }

} // class ProcedureSearchResults


export default ProcedureSearchResults;
