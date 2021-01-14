import React, { Component } from 'react'
import { WithTranslation, withTranslation } from 'react-i18next';

import axios from 'axios'
import moment from 'moment';

interface IPost {
  temperature: number;
  weather: string;
  feelsLike: number;
  sunrise: string;
}


const css = require('./Weathercard.css')


class Weathercard extends Component<WithTranslation> {



  interval:any;



  state = {
    city: "",
    cityToDisplay: "",
    latitude:0,
    longitude: 0,
    time:0,
    pictureToDisplay: "",
    posts: {temperature: 0,
      weather: "",
      feelsLike: 0,
      sunrise: ""
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


  onChangeText = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      city: event.currentTarget.value
    })
    console.log(this.state.city)
  }

  onSearch = (event: React.SyntheticEvent) => {
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
        feelsLike: Number(response.data.main.feels_like),
        sunrise: String(response.data.sys.sunrise)}
        if(response.status === 200){
          this.setState({
            posts: newPost,
            pictureToDisplay: `/weatherIMG/${response.data.weather[0].main}.png`,
            cityToDisplay : response.data.name
          }

          ,()=>{
            console.log(this.state.posts)
            console.log()
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
          feelsLike: Number(response.data.main.feels_like),
          sunrise: String(response.data.sys.sunrise)}
          if(response.status === 200){
            this.setState({
              posts: newPost,
              pictureToDisplay: `/weatherIMG/${response.data.weather[0].main}.png`,
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
        <div>
          <div className="row col-4 offset-4">
            <input className="form-control input-sm" onChange={this.onChangeText} type="text"></input>
            <button className="btn btn-secondary" onClick={this.onSearch}>{this.props.t('Search.1')}</button>
          </div>
        <div className="card"> <span className="icon"><img className="img-fluid" src={this.state.pictureToDisplay} alt={this.state.posts.weather} /></span>
        <div className="title">
            <p>{this.state.cityToDisplay}</p>
        </div>
        <div className="temp">{this.state.posts.temperature}<sup>&deg;</sup></div>
            <div className="row">
                <div className="col-4">
                    <div className="header">{this.props.t('Feels Like.1')}</div>
                    <div className="value">{this.state.posts.feelsLike}<sup>&deg;</sup></div>
                </div>
                <div className="col-4">
                    <div className="header">{this.props.t('Weather.1')}</div>
                    <div className="value">{this.state.posts.weather}</div>
                </div>
                <div className="col-4">
                    <div className="header">{this.props.t('Sunrise.1')}</div>
                    <div className="value">{moment.unix(Number(this.state.posts.sunrise)).format('LT')}</div>
                </div>
            </div>
          </div>
          </div>

          :
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-dark" role="status">
            </div>
            <p>Please enable location</p>
          </div>
        }
      </div>

    )
  }
}

export default withTranslation()(Weathercard)
