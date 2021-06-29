import React, { Component } from "react";
// import './BreakDown .css'

export default class BreakDown extends Component {
    constructor(){
        super();
        this.breakDownA=this.breakDownA.bind(this);
    }
    // ToDo : when move between links not update breakDown 
    //update only when refersh and we exit there
    breakDownA(){
        let breakDown={};
        this.props.transcations.map((tran) => {
            if(breakDown[tran.category]){
              breakDown[tran.category]+=tran.amount;
            }
            else{
              breakDown[tran.category]=tran.amount;
            }
          })
          return breakDown;
    }
     render() {
         let transcations = this.breakDownA();
      return (
        <div id="transactions">
            { Object.keys(transcations).map((obj, i) => {
                return (
                    <div key={i}>
                        {obj}: {transcations[obj]} 
                    </div>
                 )
                })}
            {/* {transcations.map((tran,index) => {
              return (
                <div>{this.breakDownA} </div>
              );
            })} */}
        </div>
      );
    }
}