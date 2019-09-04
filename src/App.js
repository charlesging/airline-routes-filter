import React, { Component } from 'react';
import Data from './data.js'
import './App.css';

class App extends Component {

  render() {
    const routes = Data.routes.map((route) => {
      return <tr>
        <td>{ route.airline }</td>
        <td>{ route.src }</td>
        <td>{ route.dest }</td>
      </tr>
    });

    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          <table class="routes-table">
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