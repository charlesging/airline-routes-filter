import React, { Component } from 'react';
import Data from './data.js'
import { getAirlineById, getAirportByCode } from './data.js';
import './App.css';

class App extends Component {

  render() {

    const routes = Data.routes.map((route, idx) => {
      const airlineName = getAirlineById(route.airline).name;
      const srcName = getAirportByCode(route.src).name;
      const destName = getAirportByCode(route.dest).name;

      return <tr key={ idx }>
        <td>{ airlineName }</td>
        <td>{ srcName }</td>
        <td>{ destName }</td>
      </tr>
    });

    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          <table className="routes-table">
            <thead>
            </thead>
            <tbody>
              { routes }
            </tbody>
          </table>
        </section>
      </div>
    );
  }
}

export default App;