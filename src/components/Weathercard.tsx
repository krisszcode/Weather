import React, { Component } from 'react'

import logo from '../images/logo.jpg'

interface Props {

}
interface State {

}


const css = require('./Weathercard.css')

class Weathercard extends Component<Props, State> {
  state = {}



  render() {
    return (
      <div>
        <div className="card">
          <img className="card-img-top" src={logo} alt="Card image"/>
          <div className="card-body">
            <h4 className="card-title">John Doe</h4>
            <p className="card-text">Some example text.</p>
            <a href="#" className="btn btn-primary">See Profile</a>
          </div>
        </div>
      </div>
    )
  }
}

export default Weathercard
