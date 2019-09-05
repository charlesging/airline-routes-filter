import React, { Component } from 'react';

class Table extends Component {

  state = {
    page: 0,
  }

  previousPage = () => {
    this.setState(function(prevState, props){
      return {page: prevState.page - 1}
    });
  }

  nextPage = () => {
    this.setState(function(prevState, props){
      return {page: prevState.page + 1}
    });
  }

  render() {

    const startIdx = this.state.page * this.props.perPage;

    const headerDataCells = this.props.columns.map((column) => {
      return <td key={column.name}>{column.name}</td>
    });

    const bodyRows = this.props.rows.slice(startIdx, startIdx + this.props.perPage).map((row) => {
      const rowData = this.props.columns.map((col) => {
        let value = row[col.property];
        return <td key={col.property + value}>{ this.props.format(col.property, value) }</td>
      });

      return <tr key={Object.values(row).join(':')}>{ rowData }</tr>
    });

    return (
      <div>
        <table className="routes-table">
          <thead>
            <tr className="title">
              { headerDataCells }         
            </tr>
          </thead>
          <tbody>
            { bodyRows }
          </tbody>
        </table>
        <div className="pagination">
          <p>
            Viewing {startIdx + 1} - {startIdx + bodyRows.length} of { this.props.rows.length} routes
          </p>
          <p>
            <button disabled={ startIdx <= 0} onClick={ this.previousPage }>Previous Page</button>
            <button disabled={ startIdx + this.props.perPage >= this.props.rows.length } onClick={ this.nextPage }>Next Page</button>
          </p>
        </div>
      </div>
    )
  }
}


export default Table;