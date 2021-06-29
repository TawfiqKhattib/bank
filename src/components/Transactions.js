import React, { Component } from "react";
import Transcation from "./Transaction";
import './Transactions.css'

export default class Transcations extends Component {
     render() {
      let transcations =  this.props.transcations;
      return (
        <div id="transactions">
         <table>
            <tr>
            <th>Amont($)</th>
            <th>Vendor</th>
            <th>Category</th>
            </tr>
          
            {transcations.map((tran,index) => {
              return (
                <Transcation key={`t${index}`} transcation={tran} />
              );
            })}
          </table>
        </div>
      );
    }
}