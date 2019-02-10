import React, { Component } from 'react';
import axios from 'axios';

class Location extends Component {
  render() {
    return(
      <div id="location-wrapper">
        <p id="location-text"></p>
      </div>
    );
  }
}

class Date extends Component {
  render() {
    return(
      <div id="date-info-wrapper">
        <p id="date-info"></p>
      </div>
    );
  }
}

class Icon extends Component {
  render() {
    return(
      <div id="icon-wrapper">
        <div id="icon"></div>
      </div>
    );
  }
}

class ExtraInfo extends Component {
  render() {
    return(
      <div id="extra-info-wrapper">
        <div id="humidity-wrapper">
          <p id="humidity-text"></p>
        </div>
        <div id="wind-wrapper">
          <p id="wind-text"></p>
        </div>
        <div id="ozone-wrapper">
          <p id="ozone-text"></p>
        </div>
      </div>
    );
  }
}

class Temp extends Component {
  render() {
    return(
      <div id="weather-info-wrapper">
        <div id="temp-info-wrapper">
          <p id="temp-text"></p>
          <p id="temp-sign"></p>
        </div>
        <ExtraInfo/>
      </div>
    );
  }
}

class FutureInfo extends Component {
  render() {
    return(
      <div id="extra-info-wrapper">
      </div>
    );
  }
}

class WeatherApp extends Component {
  render() {
    return(
      <div id="current-info-wrapper">
        <Location/>
        <Date/>
        <Icon/>
        <Temp/>
        <FutureInfo/>
      </div>
    );
  }
}

export default WeatherApp;
