import React, { Component } from 'react';

class Table extends Component {


  render() {
    const headerDataCells = this.props.columns.map((column) => {
      return <td key={column.name}>{column.name}</td>
    });

    const bodyRows = this.props.rows.map((row) => {
      const rowData = this.props.columns.map((col) => {
        let value = row[col.property];
        return <td key={col.property + value}>{ this.props.format(col.property, value) }</td>
      });

      return <tr key={Object.values(row).join(':')}>{ rowData }</tr>
    });
    
    return (
      <table className="routes-table">
        <thead>
          <tr>
            { headerDataCells }         
          </tr>
        </thead>
        <tbody>
          { bodyRows }
        </tbody>
      </table>
    )
  }
}


export default Table;