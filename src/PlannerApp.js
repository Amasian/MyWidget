import React, { Component } from 'react';
import './css/PlannerApp.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlus} from "@fortawesome/free-solid-svg-icons";

class Register extends Component {
  constructor(props) {
    super(props)
  }
  render()  {
    return(
      <div id="planner-register-wrapper" onClick={this.props.eventFunc}>
          <div id="register">
            <FontAwesomeIcon id="register-add-icon" icon={faPlus}/>
            <p id="register-text">Register plans</p>
          </div>
      </div>
    )
  }
}

class PlannerApp extends Component {
  constructor(props) {
    super(props)
    this.state={
      plans:[]
    }
    this.sortByTime = this.sortByTime.bind(this);
    this.setPlan  = this.setPlan.bind(this);
  }

  setPlan(obj) {
    let planObj = obj;
    if(this.state.plans)  {
      this.sortByTime(obj);
    }else {
      let newPlan = this.state.plans.push(planObj);
      this.setState({plans:newPlan});
    }
  }

  sortByTime(data)  {
    let userPlan = data;
    let origin = this.state.plans;
    let newPlan = origin.push(userPlan);

    newPlan.sort((a,b) => a.time-b.time);
    this.setState({plans:newPlan});
  }

  componentDidMount() {
    this.setState({plans:this.props.plans})
  }

  render()  {
    console.log(this.props.plans);
    let obj = this.props.plans;
    return(
      <div id="planner-app-wrapper">
        {(this.props.plans)? this.props.plans.map((elm, i) =>
                              <div className='plan-cards' id={i}>

                                <div className='plan-text-wrapper'>

                                  <div id="plan-time-place-wrapper">
                                    <div id="plan-time-wrapper">
                                      <div id="plan-hour-text">{elm.hour}</div>
                                      <div id="dot-wrapper">
                                        <div className="dots" id="first-dot"/>
                                        <div className="dots" id="second-dot"/>
                                      </div>
                                      <div id="plan-min-text">{elm.min}</div>
                                    </div>
                                    <div id="plan-place-text">{elm.place}</div>
                                  </div>
                                  <div id="plan-content-wrapper">
                                    <div id="plan-content-text">{elm.content}</div>
                                  </div>
                                </div>

                                <div className="plan-widgets">
                                  <div className="plan-widgets-text">
                                    <p className="plan-widgets-delete">delete</p>
                                  </div>
                                </div>

                              </div>)
                              :<div id="loading">Loading..</div>}
        <Register eventFunc={this.props.modalHandler}/>
      </div>
    )
  }
}

export default PlannerApp;
