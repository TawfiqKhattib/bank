import React, { Component } from "react";
import './style/Transaction.css'

export default class Transaction extends Component {
    render() {
      let transcation = this.props.transcation;
      return (
        <tr className={transcation.color?"green":"red"}>
            <td>{transcation.amount}</td>
            <td>{transcation.vendor}</td>
            <td>{transcation.category}</td>
        </tr>
      );
    }
}