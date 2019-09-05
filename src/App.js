import React, { Component } from 'react';
import Data from './data.js'
import Table from './components/Table.jsx'
import { getAirlineById, getAirportByCode } from './data.js';
import './App.css';

class App extends Component {
    
  formatValue = (property, value) => {
    if (property === 'airline') {
      return getAirlineById(value).name;
    } else {
      return getAirportByCode(value).name;
    }
  }

  debugger;

  render() {
    const filteredRoutes = Data.routes;
    const filteredAirlines = null;
    const filteredAirports = null;

    const columns = [
      {name: 'Airline', property: 'airline'},
      {name: 'Source Airport', property: 'src'},
      {name: 'Destination Airport', property: 'dest'},
    ];

    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          <Table className="routes-table" 
                 columns={ columns } 
                 rows= { filteredRoutes }
                 format={ this.formatValue }
                 perPage={ 25 }
          />       
        </section>
      </div>
    );
  }
}

export default App;