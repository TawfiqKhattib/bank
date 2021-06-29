import React, { Component } from "react";
import './Transaction.css'

export default class Transaction extends Component {
    render() {
      let transcation = this.props.transcation;
      return (
        <div className={transcation.color?"green":"red"}>
            ${transcation.amount}, vendor: {transcation.vendor},  catagory: {transcation.category}
            <hr></hr>
        </div>
      );
    }
}