import React, { Component } from 'react';

class Extras extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return(
      <div id="extras-wrapper">
      </div>
    )
  }
}

class Headline extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return(
      <div id="headline-wrapper">
      </div>
    )
  }
}

class NewsApp extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return(
      <div id="news-app-wrapper">
        <Headline/>
        <Extras/>
      </div>
    )
  }
}

export default NewsApp;
