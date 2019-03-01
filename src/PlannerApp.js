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
    this.getIndex = this.getIndex.bind(this);
  }

  getIndex(event)  {
    let targetElm = event.target;
    let index = targetElm.getAttribute("idx");
    return index;
  }

  render()  {
    return(
      <div id="planner-app-wrapper">
        <Register eventFunc={this.props.modalHandler}/>
        <div id="cards-wrapper">
        {(this.props.plans)? this.props.plans.map((elm, i) =>
                              <div className='plan-cards' key={i}>

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
                                    <p idx={i} className="plan-widgets-delete" onClick={(e) => this.props.delete(this.getIndex(e))}>delete</p>
                                  </div>
                                </div>

                              </div>)
                              :null}
        </div>
      </div>
    )
  }
}

export default PlannerApp;
