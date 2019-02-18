import React, { Component } from 'react';
import logo from './img/logo.svg';
import './css/App.scss';
import NewsApp from './NewsApp.js';
import PlannerApp from './PlannerApp.js';
import WeatherApp from './WeatherApp.js';
import {faNewspaper, faCloudSun, faListAlt} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
            this.state.listedApps.map(
            (elm,index) => <FontAwesomeIcon
                    key={index}
                    className= "icons"
                    icon={elm}
                    onClick={() => this.props.callBack(elm.iconName)}/>)
            :null
          }
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
        return <PlannerApp/>;
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
              night: "linear-gradient(rgb(60, 100, 140), rgb(30, 35, 60));"}
    }
    this.updateData = this.updateData.bind(this);
    this.styleHandler = this.styleHandler.bind(this);
    this.weatherAppStyleHandler = this.weatherAppStyleHandler.bind(this);
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

  render() {
    return (
      <div id="App-wrapper" style={this.styleHandler(this.state.currentApp)}>
        <Header callBack={this.updateData} />
        <Display currentApp={this.state.currentApp} />
        <Footer />
      </div>
    );
  }
}

export default App;
