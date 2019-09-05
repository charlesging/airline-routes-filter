import React, { Component } from 'react';
import Data from './data.js';
import Table from './components/Table.jsx';
import Select from './components/Select.jsx';

import { getAirlineById, getAirportByCode } from './data.js';
import './App.css';

class App extends Component {

  state = {
    airline: 'all',
    airport: 'all',
  };

  formatValue = (property, value) => {
    if (property === 'airline') {
      return getAirlineById(value).name;
    } else {
      return getAirportByCode(value).name;
    }
  };

  selectAirline = (airlineName) => {
    if (airlineName !== 'all') {
      airlineName = parseInt(airlineName, 10);
    }
    this.setState({
      airline: airlineName,
    });
  };

  selectAirport = (airportName) => {

    this.setState({
      airport: airportName,
    });
  };

  clearFilters = (event) => {
    this.setState({
      airline: 'all',
      airport: 'all'
    })
  }

  routeIncludesAirline = (route) => {
    return (route.airline === this.state.airline) ||
           (this.state.airline === 'all')
  };

  routeIncludesAirport = (route) => {
    return ([route.src, route.dest].includes(this.state.airport)) ||
           (this.state.airport === 'all')
  }

  filterRoutes = () => {
    return Data.routes.filter(this.routeIncludesAirline);
  }

  render() {

    const columns = [
      {name: 'Airline', property: 'airline'},
      {name: 'Source Airport', property: 'src'},
      {name: 'Destination Airport', property: 'dest'},
    ];

    const filteredRoutesByAirline = Data.routes.filter(this.routeIncludesAirline);
    const filteredRoutesByAirport = Data.routes.filter(this.routeIncludesAirport);

    const filteredRoutes = Data.routes.filter(route => {
      return this.routeIncludesAirline(route) && this.routeIncludesAirport(route);
    })

    const activeAirportsCodes = Data.airports.filter(airport => {
      return filteredRoutes.some(route => [route.src, route.dest].includes(airport.code) )
    }).map( airport => airport.code );

    const activeAirlineIDs = Data.airlines.filter(airline => {
      return filteredRoutes.some(route => route.airline === airline.id );
    }).map( airline => airline.id ); 

    return (

      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          Show routes on
          <Select options={ Data.airlines } 
                  filtered = { activeAirlineIDs }
                  valueKey="id" 
                  titleKey="name"
                  allTitle="All Airlines"
                  value={this.state.airline} 
                  onChange={ this.selectAirline } 
          />
          flying in or out of 
          <Select options={ Data.airports } 
                  filtered = { activeAirportsCodes }
                  valueKey="code" 
                  titleKey="name"
                  allTitle="All Airports"
                  value={this.state.airport} 
                  onChange={ this.selectAirport } 
          />
          <button onClick={ this.clearFilters }>Clear Filters</button>
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