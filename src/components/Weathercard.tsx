import React, { Component } from 'react'

import axios from 'axios'

interface IPost {
  temperature: number;
  weather: string;
  feelsLike: number;
}


const css = require('./Weathercard.css')



class WeatherCard extends Component {

  state = {
    city: "",
    cityToDisplay: "",
    latitude:0,
    longitude: 0,
    pictureToDisplay: "",
    posts: {temperature: 0,
      weather: "",
      feelsLike: 0,
    }}

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
        this.setState({
          latitude: position.coords.latitude,
          longitude:position.coords.longitude
        },() => this.getLocationDataByCoords(this.state.latitude,this.state.longitude))

      },
      (error) => {
        console.error("Error Code = " + error.code + " - " + error.message);
        this.setState({
          city: "Budapest",
          cityToDisplay: "Budapest"
        }, this.getLocationDataByName)
      }
    );
  }

  // componentWillMount(){
  //   this.setState({
  //     city: "Győr",
  //     cityToDisplay: "Győr"
  //   }, this.getLocationDataByName)
  // }


  defaultPost: IPost = {temperature: 0, weather: "", feelsLike: 0 }

  onChangeText = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      city: event.currentTarget.value
    })
    console.log(this.state.city)
  }

  onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()
    this.getLocationDataByName()
  }

  getLocationDataByCoords(latitude:Number,longitude:Number){
    axios
    .get<IPost>(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
    .then((response: any) => {
      const newPost :IPost =
      {temperature: Number(response.data.main.temp),
        weather: String(response.data.weather[0].main),
        feelsLike: Number(response.data.main.feels_like)}
        if(response.status === 200){
          this.setState({
            posts: newPost,
            pictureToDisplay: `/weatherIMG/${response.data.weather[0].main}.jpg`,
            cityToDisplay : response.data.name
          }

          ,()=>{
            console.log(this.state.posts)
            console.log(this.state.pictureToDisplay)
          })
        }
  })
  }

  getLocationDataByName(){
    axios
      .get<IPost>(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
      .then((response: any) => {
        const newPost :IPost =
        {temperature: Number(response.data.main.temp),
          weather: String(response.data.weather[0].main),
          feelsLike: Number(response.data.main.feels_like)}
          if(response.status === 200){
            this.setState({
              posts: newPost,
              pictureToDisplay: `/weatherIMG/${response.data.weather[0].main}.jpg`,
              cityToDisplay : this.state.city
            }

            ,()=>{
              console.log(this.state.posts)
              console.log(this.state.pictureToDisplay)
            })
          }
    })
  }

    render() {

    return (

      <div>
        {this.state.cityToDisplay!== "" ?
          <div className="card">
          <div>
            <img className="card-img-top" src={this.state.pictureToDisplay} alt={this.state.posts.weather}/>
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
                <h4 className="card-title">{this.state.cityToDisplay}</h4>
                <p className="card-text">{this.state.posts.weather}</p>
                <p className="card-text">{this.state.posts.temperature} ℃</p>
                <p className="card-text">{this.state.posts.feelsLike} ℃</p>
                <input type="text" onChange={this.onChangeText}></input>
                <button>gomb</button>
              </form>
            </div>
            </div>
          </div> :
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
            </div>
            <p>Please enable location</p>
          </div>
        }
      </div>

    )
  }
}

export default WeatherCard
