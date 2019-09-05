import React, { Component } from 'react';
import Data from './data.js'
import Table from './components/Table.jsx'
import { getAirlineById, getAirportByCode, getAirlineByName } from './data.js';
import './App.css';

class App extends Component {

  state = {
    airline: 'all',
    airport: 'all',
  }

  formatValue = (property, value) => {
    if (property === 'airline') {
      return getAirlineById(value).name;
    } else {
      return getAirportByCode(value).name;
    }
  }

  selectAirline = (event) => {
    let airline = event.target.value;
    this.setState({
      airline: airline,
    });
  }

  filterRoutes = () => {
    if (this.state.airline === 'all') {
      return Data.routes;
    }
    let airlineID = getAirlineByName(this.state.airline).id;

    return Data.routes.filter(route => {
      return route.airline === airlineID;
    });

  }

  render() {
    const filteredAirports = null;

    const filteredRoutes = this.filterRoutes();

    const filteredAirlines = Data.airlines.map(airline => {
      let disabled;
      if (this.state.airline !== 'all') {        
        disabled = airline.name !== this.state.airline
      }
      return <option value={ this.props.value } disabled={ disabled } key={airline.id}>
               { airline.name }
             </option>
    });

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
          <select value={ this.state.airline } onChange={ this.selectAirline }>
            { [<option key="all" value="all">All Airlines</option>,
                ...filteredAirlines] }
          </select>
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