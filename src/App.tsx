import Header from './components/Header';
import Navbar from './components/Navbar';
import React from 'react'
import Weathercard from './components/Weathercard'

const App: React.FC = () => {
  return (
  <div className="app">
    <div className="app-header">
      <Navbar/>
      <Header/>
    </div>
    <div className="">
      <Weathercard/>
    </div>
  </div>
  )
}

export default App;