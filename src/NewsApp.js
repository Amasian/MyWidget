import React, { Component } from 'react';
import './css/NewsApp.scss';
import axios from 'axios';

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
    this.state = {
      data:this.props.data,
      urlList:this.props.url
    }
    this.changeArt = this.changeArt.bind(this);
  }

  componentDidMount(changeArt) {
    setInterval(changeArt,5000);
  }

  changeArt() {
    return null;
  }

  render() {
    console.log(this.state.urlList);
    return(
      <div id="headline-wrapper">
        {(this.state.urlList)? this.state.urlList:null}
      </div>
    )
  }
}

class NewsApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data:this.props.data,
      urlList:this.props.urlList,
      isLoaing:false
    }
  }

componentDidMount() {
  const URL = 'https://api.nytimes.com/svc/topstories/v2/science.json?api-key=JoqkiXzZ0GoPgjxFrhHBA42XLzGwAYFq';
  axios.get(URL)
      .then(response=> this.setState({
        data:response.data.results,
        urlList:response.data.results.map(arr => arr.multimedia[4]),
        isLoading: false}))
      .catch(error=> console.log(error));
}

  render() {
    console.log(this.state.urlList);
    return(
      <div id="news-app-wrapper">
        <Headline data={this.state.data} url={this.state.urlList}/>
        <Extras data={this.state.data} url={this.state.urlList}/>
      </div>
    )
  }
}

export default NewsApp;
