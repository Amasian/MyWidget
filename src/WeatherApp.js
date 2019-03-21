import React, { Component } from 'react';
import './css/WeatherApp.scss';
import axios from 'axios';
import {faMapMarkerAlt, faTint, faWind, faSun} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Skycons from 'react-skycons';

class Location extends Component {
  render() {
    return(
      <div id="location-wrapper">
          <div id="location-text-wrapper">
            <FontAwesomeIcon id="location-icon"icon={faMapMarkerAlt}/>
          {(this.props.localName)?
            <p id="location-text">{this.props.localName}</p>:
            <p id="location-text">Loading..</p>}
          </div>
      </div>
    );
  }
}

class DateInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dateInfo:""
    }
    this.showLocalDate = this.showLocalDate.bind(this);
  }

  showLocalDate() {
    const monthList = {
      0:"Jan", 1:"Fab", 2:"Mar",
      3:"Apr", 4:"May", 5:"Jun",
      6:"Jul", 7:"Aug", 8:"Sep",
      9:"Oct", 10:"Nov", 11:"Dec"
    };
    const dayList = {
      0:"MON", 1:"TUE", 2:"WED",
      3:"THR", 4:"FRI", 5:"SAT", 6:"SUN"
    };
    let currDate = new Date();
    let year = currDate.getFullYear().toString();
    let month = monthList[currDate.getMonth()];
    let date = currDate.getDate().toString();
    let day = dayList[(currDate.getDay() === 0)? 6:currDate.getDay()-1];
    let fullDate = month + ". " + date + ". " + year
                        + " (" + day + ")";
    return fullDate;
  }

  render() {
    return(
      <div id="date-info-wrapper">
        <p id="date-info">{this.showLocalDate()}</p>
      </div>
    );
  }
}

class Icon extends Component {
  constructor(props)  {
    super(props)
    this.converter = this.converter.bind(this)
  }

  converter(str) {
    let arr = str.toUpperCase().split("-");
    return arr.join("_");
  }

  render() {
    return(
      <div id="weather-state-icon">
        <div id="icon-wrapper">
        {(this.props.iconInfo)? <Skycons
                                  id = "weather-icon"
                                  color='white'
                                  icon={this.converter(this.props.iconInfo)} />
                                  :<p id='loading'>Loading..</p>}
        </div>
      </div>
    );
  }
}

class ExtraInfo extends Component {
  constructor(props)  {
    super(props)
  }

  render() {
    return(
      <div id="extra-info-wrapper">
        <div className = "extra-infos">
          <FontAwesomeIcon className="extra-icons" icon={faTint}/>
          <p className="extra-texts" id="humidity-text">{this.props.extraInfo.humidity}</p>
        </div>
        <div className = "extra-infos">
        <FontAwesomeIcon  className="extra-icons" icon={faWind}/>
          <p className="extra-texts" id="wind-text">{this.props.extraInfo.wind}</p>
        </div>
        <div className = "extra-infos">
        <FontAwesomeIcon  className="extra-icons" icon={faSun}/>
          <p className="extra-texts" id="ozone-text">{this.props.extraInfo.ozone}</p>
        </div>
      </div>
    );
  }
}

class Temp extends Component {
  constructor(props)  {
    super(props)
    this.state = {
      currentSymbol: "°F",
      currentTemp: this.props.tempInfo
    }
    this.convertSymbol = this.convertSymbol.bind(this)
  }

  convertSymbol() {
    let temp = this.state.currentTemp.curTemp,
        max = this.state.currentTemp.maxTemp,
        min = this.state.currentTemp.minTemp;
    if(this.state.currentSymbol === "°F")  {
      let newTemp = Math.round((temp-32)*0.55),
          newMax = Math.round((max-32)*0.55),
          newMin = Math.round((min-32)*0.55);
      this.setState({currentSymbol:"°C",
                    currentTemp:{
                      curTemp: newTemp,
                      maxTemp: newMax,
                      minTemp: newMin}});
    }else {
      let newTemp = Math.round((temp*9/5)+32),
          newMax = Math.round((max*9/5)+32),
          newMin = Math.round((min*9/5)+32);
      this.setState({currentSymbol:"°F",
                    currentTemp:{
                    curTemp: newTemp,
                    maxTemp: newMax,
                    minTemp: newMin}});
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.currentTemp !==  nextState.currentTemp
  }

  render() {
    console.log(this.state);
    const curTemp = this.state.currentTemp.curTemp,
          maxDiff = Math.round(this.state.currentTemp.maxTemp-this.state.currentTemp.curTemp,0),
          minDiff = Math.abs(Math.round(this.state.currentTemp.minTemp-this.state.currentTemp.curTemp,0));
    return(
      <div id="temp-info-wrapper">
        <div id="temp-text-symbol-wrapper">
          <div id="temp-text-symbol-demarcation">
            <div id="temp-text-wrapper">
              <p className="temp-diffs" id="temp-max-text">↑{maxDiff}</p>
              {(this.props.tempInfo.curTemp)? <p id="temp-current-text">{Number.parseFloat(this.state.currentTemp.curTemp).toFixed(1)}</p>
                                              :<div id="temp-text-loading">Calculating..</div>}
              <p className="temp-diffs" id="temp-min-text">↓{minDiff}</p>
            </div>
            <p id="temp-sign" onClick = {this.convertSymbol}>{this.state.currentSymbol}</p>
          </div>
        </div>
        <ExtraInfo extraInfo = {this.props.extraInfo}/>
      </div>
    );
  }
}

class FutureInfo extends Component {
  constructor(props)  {
    super(props)
    this.state = {
        maxTemp:0,
        minTemp:0,
        iconInfo:"",
        childrenCom: [null, null, null, null, null]
    }
    this.getFutureInfo = this.getFutureInfo.bind(this)
    this.showDateInSec = this.showDateInSec.bind(this)
    this.getFutureDate = this.getFutureDate.bind(this)
    this.converter = this.converter.bind(this)
    this.updateIcon = this.updateIcon.bind(this)
  }

  showDateInSec(curr, userInput) {
    let currentDate = parseInt(curr, 10);
    let idx = userInput;
    let fiveDateArr = [
      currentDate+86400,
      currentDate+(86400*2),
      currentDate+(86400*3),
      currentDate+(86400*4),
      currentDate+(86400*5)
    ]
    return fiveDateArr[idx];
  }

  getFutureInfo(event)  {
    let index = event.target.getAttribute('idx');
    const curDate = Date.now().toString().slice(0,10);
    let lat = this.props.locationInfo.lat,
        lon = this.props.locationInfo.lon;
    let key = "f9a725f636de6730c80647ef19c80151";
    let URL = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/"
              + key + "/"+ lat + "," + lon + ","
              + this.showDateInSec(curDate, index);
    axios.get(URL)
          .then(result => this.setState({maxTemp:result.data.daily.data[0].temperatureHigh,
                                        minTemp:result.data.daily.data[0].temperatureLow,
                                        iconInfo:result.data.currently.icon}, function() {this.updateIcon(index);}))
          .catch(error => console.log(error));
  }

  updateIcon(index)  {
    if(this.state.iconInfo) {
      let newArr = this.state.childrenCom.slice();
      newArr[index] = <div className="future-weather-infos-wrapper">
                        <div className="future-icons-wrapper">
                          <Skycons
                            id = "weather-icon"
                            color='white'
                            icon={this.converter(this.state.iconInfo)} />
                        </div>
                        <div className="future-temp-wrapper">
                          <p className="future-temp"  id="future-max">{this.state.maxTemp}</p>
                          <p className="future-temp" id="future-min">{this.state.minTemp}</p>
                        </div>
                      </div>;
      this.setState({childrenCom: newArr});
    }
  }

  getFutureDate() {
    let result = [];
    const dayList = {
      1:"MON", 2:"TUE", 3:"WED",
      4:"THR", 5:"FRI", 6:"SAT", 0:"SUN"
    }
    let today = new Date();
    let tomorrow = today.getDay()+1;
    let dayNum = (tomorrow > 6)? 0:tomorrow;
    let daysInNum = [];
    for(let i = 0; i < 5; i++) {
      if(dayNum > 6)  {
        dayNum = 0;
      }
      daysInNum.push(dayList[dayNum]);
      dayNum++;
    }
    return daysInNum;
  }

  converter(str) {
    let arr = str.toUpperCase().split("-");
    return arr.join("_");
  }

  render() {
    let dayInfos = this.getFutureDate();
    let days = dayInfos.map((day, i) =>
                    <div className="future-infos" key={i}>
                      <div className="future-infos-date-wrapper">
                        <p  className="future-infos-date-texts">{day}</p>
                      </div>
                      <div className="future-infos-bttn-wrapper" id="future-info-icon-target">
                        {(!this.state.childrenCom[i])?
                          <button
                          key={i} idx={i}
                          className="future-infos-bttns"
                          onClick={event => this.getFutureInfo(event)}>View</button>:
                          this.state.childrenCom[i]
                        }
                      </div>
                    </div>);
    return(
      <div id="future-info-wrapper">
        {days}
      </div>
    );
  }
}

class WeatherApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      location:{},
      localName:"",
      icon:"",
      extraInfo:{
        humidity:"",
        wind:"",
        ozone:""
      },
      tempInfo:{
        curTemp:"",
        maxTemp:"",
        minTemp:""
      },
      isLoading:true
    }
    this.getLocation = this.getLocation.bind(this);
    this.getWeatherInfo = this.getWeatherInfo.bind(this);
    this.getLocalName = this.getLocalName.bind(this);
    this.showLocalName = this.showLocalName.bind(this);
  }

  getLocation(json) {
    console.log(json);
    let localeInfo = {lat:json.data.latitude, lon:json.data.longitude};
    this.setState({location:localeInfo});
    this.getWeatherInfo(localeInfo.lat, localeInfo.lon);
    this.getLocalName(localeInfo);
  }

  getWeatherInfo(lat, lon) {
    let key = "f9a725f636de6730c80647ef19c80151";
    let URL = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/"
              + key + "/"+ lat +"," + lon;
    axios.get(URL)
          .then(data => this.setState({icon:data.data.currently.icon,
                                        extraInfo:{
                                          humidity:data.data.currently.humidity,
                                          wind:data.data.currently.windSpeed,
                                          ozone:data.data.currently.ozone
                                        },
                                        tempInfo:{
                                          curTemp:data.data.currently.temperature,
                                          maxTemp:data.data.daily.data[0].temperatureHigh,
                                          minTemp:data.data.daily.data[0].temperatureLow
                                        },
                                        isLoading:false
                                      })
                                    )
          .catch(error => console.log(error));
  }

  getLocalName(data) {
      let lat = data.lat,
          lon = data.lon;
      let id = "tqPszotnugjNK7ZmD5gY",
          code = "yEB-XHkbUe5tMlKvvv1RJQ";
      let URL = "https://reverse.geocoder.api.here.com/6.2/reversegeocode.json?prox=" + lat
                + "%2C" + lon + "%2C250&mode=retrieveAddresses&maxresults=1&gen=9&app_id="
                + id + "&app_code=" + code;
       axios.get(URL)
            .then(result => this.showLocalName(result))
            .catch(error => console.log(error));
  }

  showLocalName(result) {
    if(result.data.Response) {
      let address = result.data.Response.View[0].Result[0].Location.Address;
      let cityName = address.City;
      this.setState({localName:cityName});
    }
  }

  componentDidMount() {
    axios.get("https://ipapi.co/json/")
        .then(data => this.getLocation(data))
        .catch(e => console.log(e))
    //if (navigator.geolocation) {navigator.geolocation.getCurrentPosition(this.getLocation);}
    //getCurrentPosition is deprecated in HTTP AJAX request
  }

  render() {
    const appState = this.state;
    return(
      <div id="weather-app-wrapper">
        <div id="weather-app-today">
        {(appState.localName && appState.icon && appState.tempInfo)?
          <div id="weather-today-wrapper">
            <div id="client-info-wrapper">
              <Location localName={this.state.localName}/>
              <DateInfo/>
            </div>
            <div id="weather-info-wrapper">
              <Icon iconInfo = {this.state.icon}/>
              <Temp tempInfo = {this.state.tempInfo} extraInfo = {this.state.extraInfo}/>
            </div>
          </div>:
          <div id="weather-loading">
            <h2 id="weather-loading-text">Loading..</h2>
          </div>
        }
        </div>
        <FutureInfo locationInfo = {this.state.location}/>
      </div>
    );
  }
}

export default WeatherApp;
