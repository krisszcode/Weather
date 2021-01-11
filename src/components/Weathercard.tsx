import React, { Component } from 'react'

import axios from 'axios'
import logo from '../images/logo.jpg'

interface ICity{
  cityname: string;
}
interface IPost {
  temperature: number;
  weather: string;
  feelsLike: number;
}



const css = require('./Weathercard.css')

class WeatherCard extends Component {

  state = {
    city: "",
    posts: {temperature: 0,
      weather: "",
      feelsLike: 0,
    }}

  componentWillMount(){
    this.setState({
      city: "Miskolc"
    }, this.getLocationData)
    console.log(this.state.city)

  }

  defaultPost: IPost = {temperature: 0, weather: "", feelsLike: 0 }

  onChangeText = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      city: event.currentTarget.value
    })
    console.log(this.state.city)
  }

  onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()

  }


  getLocationData(){
    axios
      .get<any>(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
      .then((response: any) => {
        const newPost :IPost =
        {temperature: Number(response.data.main.temp),
          weather: String(response.data.weather[0].main),
          feelsLike: Number(response.data.main.feels_like)}
        this.setState({
          posts: newPost
        },()=>{
          console.log(this.state.posts)
        })
    });
  }


    render() {
    return (
      <div>
        <div className="card">
          <img className="card-img-top" src={logo} alt="Card image"/>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <h4 className="card-title">John Doe</h4>
              <p className="card-text">Some example text.</p>
              <input type="text" onChange={this.onChangeText}></input>
              <button>gomb</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default WeatherCard
