import React, { Component } from 'react'

interface Props {

}
interface State {

}

class Navbar extends Component<Props, State> {
  state = {}

  render() {
    return (
      <div>
        <div className="navbar navbar-dark bg-dark shadow-sm">
          <div className="container">
            <div className="navbar-brand d-flex align-items-center">
              Weather
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Navbar
