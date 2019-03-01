import React, { Component } from 'react';
import logo from './img/logo.svg';
import './css/App.scss';
import NewsApp from './NewsApp.js';
import PlannerApp from './PlannerApp.js';
import WeatherApp from './WeatherApp.js';
import {faNewspaper, faCloudSun, faListAlt, faTimes} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Modal extends Component {
  constructor(props) {
    super(props)
    this.state={
      input:{
        hour:"",
        min:"",
        place:"",
        content:""
      }
    }
    this.inputHandler = this.inputHandler.bind(this);
  }

  inputHandler(event)  {
    let origin = this.state.input;
    switch (event.target.name) {
      case 'hour':
        this.setState({input:{hour:event.target.value,
                              min:origin.min,
                              place:origin.place,
                              content:origin.content}})
        break;
      case 'min':
        this.setState({input:{hour:origin.hour,
                              min:event.target.value,
                              place:origin.place,
                              content:origin.content}})
        break;
      case 'place':
        this.setState({input:{hour:origin.hour,
                              min:origin.min,
                              place:event.target.value,
                              content:origin.content}})
        break;
      case 'content':
        this.setState({input:{hour:origin.hour,
                              min:origin.min,
                              place:origin.place,
                              content:event.target.value}})
        break;
      default:
        return null;
    }
  }

  render()  {
    let userInput = this.state.input;
    return(
      <div id="modal-background">
        <FontAwesomeIcon id="modal-close-icon" icon={faTimes} onClick={this.props.modalHandler}/>
        <div id="modal-wrapper">
          <div id="modal-title-wrapper">
            <h2 id="modal-title-text">Register Plan</h2>
          </div>
            <form id="modal-menu">
              <div id="modal-input-time">
                <div id="hour-input-wrapper">
                  <lable className="modal-input-texts">Hour
                    <input className="modal-time-inputs" type="text" name="hour" value={this.state.input.hour} onChange={this.inputHandler} required/>
                  </lable>
                </div>
                <div id="min-input-wrapper">
                  <lable className="modal-input-texts">Minute
                    <input className="modal-time-inputs" type="text" name="min" value={this.state.input.min} onChange={this.inputHandler} required/>
                  </lable>
                </div>
              </div>
              <lable id="modal-place-text" className="modal-input-texts">Place
                <input id="modal-place-input" type="text" name="place" value={this.state.input.place} onChange={this.inputHandler}/>
              </lable>
              <lable id="modal-content-text" className="modal-input-texts">Content
                <textarea id="modal-content-input" row='2' col='8' name="content" value={this.state.input.content} onChange={this.inputHandler} required/>
              </lable>
            </form>
            <div id="modal-bttn-wrapper">
              <button type="button" className="modal-buttons" id="bttn-submit" onClick={() => this.props.planHandler(userInput)}>submit</button>
              <button type="button" className="modal-buttons" id="bttn-cancle" onClick={this.props.modalHandler}>cancle</button>
            </div>
        </div>
      </div>
    )
  }
}

class Header extends Component {
  constructor(props) {
    super(props)
    this.state ={
      listedApps:[faNewspaper, faCloudSun, faListAlt],
      isToggled:false
    }
    this.toggleMenu = this.toggleMenu.bind(this)
  }

  toggleMenu() {
    const menuElm = document.getElementById("header-wrapper");
    const arrowElm = document.getElementById("menu-arrow");
    const arrowStyle = arrowElm.style;
    const iconsElm = document.getElementById("header-icon-wrapper");

    if(this.state.isToggled) {
      menuElm.style.height = '40px';
      iconsElm.style.display = "none";
      arrowStyle.display = 'block';
      arrowStyle.width = '0px';
      arrowStyle.height = '0px';
      arrowStyle.borderTop = '10px solid rgb(120,120,120)';
      arrowStyle.borderBottom = '0px solid rgb(120,120,120)';
      arrowStyle.borderLeft = '20px solid transparent';
      arrowStyle.borderRight = '20px solid transparent';
      this.setState({isToggled:false});
    }else {
      menuElm.style.height = '100px';
      iconsElm.style.display = "flex";
      arrowStyle.display = 'block';
      arrowStyle.width = '25px';
      arrowStyle.height = '4px';
      arrowStyle.borderTop = '1px solid rgb(120,120,120)';
      arrowStyle.borderBottom = '1px solid rgb(120,120,120)';
      arrowStyle.borderLeft = '0px solid transparent';
      arrowStyle.borderRight = '0px solid transparent';
      this.setState({isToggled:true});
    }
  }

  render() {
    return(
      <div id="header-wrapper">
        <div id="header-icon-wrapper">
          {(this.state.isToggled)?
            <div id="icons-wrapper">
              <div className="icon-text-wrapper">
                <FontAwesomeIcon
                  key={faNewspaper.iconName}
                  className= "icons"
                  id={faNewspaper.iconName}
                  icon={faNewspaper}
                  onClick={() => this.props.callBack(faNewspaper.iconName)}/>
                <p className="icon-text">news</p>
              </div>
              <div className="icon-text-wrapper">
                <FontAwesomeIcon
                  key={faCloudSun.iconName}
                  className= "icons"
                  id={faCloudSun.iconName}
                  icon={faCloudSun}
                  onClick={() => this.props.callBack(faCloudSun.iconName)}/>
                <p className="icon-text">forecast</p>
              </div>
              <div className="icon-text-wrapper">
                <FontAwesomeIcon
                  key={faListAlt.iconName}
                  className= "icons"
                  id={faListAlt.iconName}
                  icon={faListAlt}
                  onClick={() => this.props.callBack(faListAlt.iconName)}/>
                <p className="icon-text">planner</p>
              </div>
              </div>:null}
        </div>
        <div id="menu-arrow" onClick={this.toggleMenu}/>
      </div>
    )
  }
}

class Footer extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return(
      <div id="footer-wrapper">
        <p>2019©Handcrafted by Jay</p>
      </div>
    )
  }
}

class Display extends Component {
  constructor(props) {
    super(props)
    this.state = {
      view:this.props.currentApp
    }
    this.renderApp = this.renderApp.bind(this)
  }

  static getDerivedStateFromProps(props, state) {
    if(props.currentApp !== state.view) {
      return {view:props.currentApp};
    }else {
      return null;
    }
  }

  renderApp() {
    switch(this.state.view) {
      case 'cloud-sun':
        return <WeatherApp/>;
        break;
      case 'list-alt':
        return <PlannerApp delete={this.props.deletePlan} plans={this.props.plans} modalHandler={this.props.modalHandler}/>;
        break;
      case 'newspaper':
        return <NewsApp/>;
        break;
      default:
        return <NewsApp/>;
        break;
    }
  }

  render() {
    return(
      <div id="field">
        {this.renderApp()}
      </div>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentApp:'newspaper',
      style: {day:"linear-gradient(rgb(100, 190, 240), rgb(40, 120, 180));",
              sunset:"linear-gradient(rgb(255, 153, 51), rgb(130, 60, 20));",
              night: "linear-gradient(rgb(60, 100, 140), rgb(30, 35, 60));"},
      isModaled:false,
      plans:[]
    }
    this.updateData = this.updateData.bind(this);
    this.styleHandler = this.styleHandler.bind(this);
    this.weatherAppStyleHandler = this.weatherAppStyleHandler.bind(this);
    this.modalHandler = this.modalHandler.bind(this);
    this.planHandler = this.planHandler.bind(this);
    this.sortByTime = this.sortByTime.bind(this);
    this.deletePlan = this.deletePlan.bind(this);
  }

  updateData(app) {
    this.setState({currentApp:app});
    this.styleHandler(this.state.currentApp);
  }

  weatherAppStyleHandler() {
    let currentHour = new Date().getHours();
    if(16 <= currentHour && currentHour < 19) {
      document.body.style.background = this.state.style.day;
    }else if(19 <= currentHour || currentHour < 6) {
      document.body.style.background = this.state.style.sunset;
    }else {
      document.body.style.background = this.state.style.night;
    }
  }

  styleHandler(app) {
    let currentApp = app;
    if(currentApp === 'cloud-sun') {
      return {background: "linear-gradient(rgb(100, 190, 240), rgb(40, 120, 180))"};
    }else {
      return {backgroundColor: "transparent"};
    }
  }

  modalHandler()  {
    if(!this.state.isModaled) {
      this.setState({isModaled:true});
    }else {
      this.setState({isModaled:false});
    }
  }

  planHandler(data) {
    let curData = this.state.plans.slice();
    if(!curData)  {
      curData.push(data);
      this.setState({plans:curData});
    }else {
      this.setState(this.sortByTime(data));
    }
  }

  sortByTime(data)  {
    let userPlan = data;
    let origin = this.state.plans
    origin.push(userPlan);
    origin.sort((a, b) => ((a.hour*60)+a.min)-((b.hour*60)+b.min));
    return origin;
  }

  deletePlan(index)  {
    let head = this.state.plans.slice(0, index);
    let newIndex = parseInt(index,10)+1;
    let tail = this.state.plans.slice(newIndex, );
    let newPlan = head.concat(tail);

    this.setState({plans:newPlan});
  }

  render() {
    return (
      <div id="App-wrapper" style={this.styleHandler(this.state.currentApp)}>
        <Header callBack={this.updateData} />
        <Display deletePlan={this.deletePlan} plans={this.state.plans} modalHandler={this.modalHandler} currentApp={this.state.currentApp} />
        <Footer />
        {(this.state.isModaled)? <Modal planHandler={this.planHandler} modalHandler={this.modalHandler}/>:null}
      </div>
    );
  }
}

export default App;
