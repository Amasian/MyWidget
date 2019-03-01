import React, { Component } from 'react';
import './css/NewsApp.scss';
import axios from 'axios';

class Articles extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return(
      <div id="articles-wrapper">
      {(this.props.data)?
        this.props.data.map((obj, i) =>
        <div className="article-cards" key={i} id={i}>
          <div className="article-card-text-wrapper">
            <a className="article-links" href={obj.url} target="_blank">
              <p className="article-titles">{obj.title}</p>
            </a>
            <p className="article-by">{"-"  + obj.byline}</p>
          </div>
        </div>):<div id="loading">loading..</div>}
      </div>
    )
  }
}

class Clock extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timeInfo:{
        hour:null,
        minute:null,
        meridiemInfo:null
      },
      dateInfo:{
        day:"",
        date:"",
        month:""
      }
    }
    this.getTime = this.getTime.bind(this)
  }

  getTime()  {
    let today = new Date(),
        hour = (today.getHours() > 12)? today.getHours() - 12:today.getHours(),
        newHour = (hour.toString().length === 1)? "0" + hour:hour,
        meridiem = (today.getHours() >= 12)? "PM":"AM",
        minute = today.getMinutes(),
        newMinute = (minute.toString().length === 1)? "0" + minute:minute;
    this.setState({timeInfo:{hour:newHour, minute: newMinute, meridiemInfo:meridiem}});
  }

  getDate() {
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
    let month = monthList[currDate.getMonth()];
    let date = currDate.getDate().toString();
    let day = dayList[(currDate.getDay() === 0)? 6:currDate.getDay()-1];
    this.setState({dateInfo:{day:day, date: date, month:month}});
  }

  componentDidMount() {
    this.getDate();
    this.getTime();
    this.interval = setInterval(this.getTime,1000);
  }
  componentWillUnmount()  {
    clearInterval(this.interval);
  }

  render() {
    return(
      <div id="clock-wrapper">
        <div id="date-wrapper">
          <div className="date-infos-wrapper">
            <p className="date-infos" id="date-month">{this.state.dateInfo.month}</p>
          </div>
          <div className="date-infos-wrapper">
            <p className="date-infos" id="date-date">{this.state.dateInfo.date}</p>
          </div>
          <div className="date-infos-wrapper">
            <p className="date-infos" id="day-date">{this.state.dateInfo.day}</p>
          </div>
        </div>
        <div id="clock-time-wrapper">
          <div id="clock-time-text-wrapper">
            <div className = "time-texts" id="hour-wrapper">
              <p id="hour-text">{this.state.timeInfo.hour}</p>
              <p id="meridiem-text">{this.state.timeInfo.meridiemInfo}</p>
            </div>
            <div id="time-demarcation">
              <div className="dots" id="dot-first"></div>
              <div className="dots" id="dot-second"></div>
            </div>
            <div className = "time-texts" id="min-wrapper">
              <p id="min-text">{this.state.timeInfo.minute}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class Headline extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content:{}
    }
    this.changeArti = this.changeArti.bind(this);
  }

  componentDidMount() {
      setTimeout(this.changeArti,  1500);
      this.intervalVal = setInterval(this.changeArti,  6000);
  }

  changeArti() {
    console.log("activasted");
    let maxVal = this.props.data.length;
    let ranNum = Math.floor((Math.random() * maxVal));

    console.log(this.props.data[ranNum]);
    console.log(this.props.url[ranNum]);

    let section = this.props.data[ranNum].section;
    let title = this.props.data[ranNum].title;
    let author = this.props.data[ranNum].byline;
    let updatedDate = this.props.data[ranNum].updated_date;
    const logoURL = 'https://www.shareicon.net/data/512x512/2016/06/23/614156_new_512x512.png';
    let imgVal = (this.props.url[ranNum])? this.props.url[ranNum].url:logoURL;
    let url = this.props.data[ranNum].url;
    this.setState({content:{imgURL:imgVal,
                            section:section,
                            title:title,
                            by:'- '+author,
                            dateInfo:updatedDate,
                            link:url}});
  }

  componentWillUnmount()  {
    clearInterval(this.intervalVal);
  }

  render() {
    let content = this.state.content;
    return(
      <div id="headline-wrapper">
        {(content)? <div id="news-background-img"
                                style={{backgroundImage: 'url('+content.imgURL+')',
                                        backgroundPosition:'center',
                                        backgroundSize: 'cover',
                                        transition: '0.6s'}}>
                              <p id="headline-section-text">{content.section}</p>
                              <div id="headline-text-wrapper">
                                <div id="headline-text">
                                  <a className="article-links" href={content.link} target="_blank">
                                    <h3 id="article-title">{content.title}</h3>
                                  </a>
                                  <p id="article-by">{content.by}</p>
                                </div>
                              </div>
                            </div>:<p id="loading">Loading..</p>}
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
      .catch(error => this.setState({
        data:null,
        urlList:null,
        isLoading: false
      }))
}

  render() {
    return(
      <div id="news-app-wrapper">
        <Headline data={this.state.data} url={this.state.urlList}/>
        <div id="extras-wrapper">
          <Clock/>
          <Articles data={this.state.data}/>
        </div>
      </div>
    )
  }
}

export default NewsApp;
