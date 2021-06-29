import React, { Component } from "react";
import Transcation from "./Transaction";

export default class Transcations extends Component {
     render() {
      let transcations =  this.props.transcations;
      return (
        <div>
         
          {transcations.map((tran,index) => {
            return (
              <Transcation key={`t${index}`} transcation={tran} />
            );
          })}
        </div>
      );
    }
}