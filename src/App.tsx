import React, { Component } from 'react'

import Header from './components/Header';
import Weathercard from './components/Weathercard'

const css = require('./App.css')



class App extends Component {


  render() {


  return (
  <div className="app">
    <div className="app-header">
      <Header/>
    </div>
    <div className="container-fluid d-flex justify-content-center">
      <div className="weather">
        <div className="row">
            <div className="col-md-6">
              <Weathercard/>
            </div>
            <div className="col-md-6 ">
              <Weathercard/>
            </div>
            <div className="col-md-6">
              <Weathercard/>
            </div>
            <div className="col-md-6">
              <Weathercard/>
            </div>
        </div>
      </div>
    </div>
  </div>
  );
  }
}

export default App;