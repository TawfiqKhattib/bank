import React, { Component } from "react";
import "./App.css";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Operations from "./components/Operations";
import Transcations from "./components/Transactions";
import BreakDown  from "./components/BreakDown";
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class App extends Component {
  constructor(){
    super();
    this.mode_api_url()
    this.state={
    transcations:[],
    amount:0,
    
    }  
    this.amount= this.amount.bind(this);
    this.deposit=this.deposit.bind(this);
    this.withdraw=this.withdraw.bind(this);
    this.delete = this.delete.bind(this);
    this.getData=this.getData.bind(this);
  }

  mode_api_url = () => {
    let url
    let port = process.env.PORT || "3500"
    if (process.env.NODE_ENV === 'development') {
      url = `http://localhost:${port}/`
    }

    if (process.env.NODE_ENV === 'production') {
      url = `https://banktranactions.herokuapp.com//:${port}`
    }
    this.api_url = url

  }

  amount(transcations){
    let sum = 0;
    for(let elem of transcations){
        sum+=elem.amount     
    }
    return sum;
  }

  async deposit(transactionObj){
  //  await axios.post("http://localhost:3500/transactions",{data: transactionObj})
  await axios.post(`${this.api_url}transactions`,{data: transactionObj})
    await this.getData()

  }
  async withdraw(transactionObj){
    // await axios.post("http://localhost:3500/transactions",{ data: transactionObj})
    await axios.post(`${this.api_url}transactions`,{ data: transactionObj})
    await this.getData()

  }
  async delete(transactionObj){
    // await axios.delete("http://localhost:3500/transactions",{data:{transactionObj}});
    await axios.delete(`${this.api_url}transactions`,{data:{transactionObj}});
    await this.getData()

  }

   async getData(){
    //  let transcations =await axios.get("http://localhost:3500/transactions");
    let transcations =await axios.get(`${this.api_url}transactions`);
    let transcationsData=transcations.data;
    let amountTotal = this.amount(transcationsData)
     this.setState({transcations:transcationsData,amount:amountTotal});
  }

  async componentDidMount() {
    await this.getData()
  }
  render() {
  
    return (
      <Router>
        <div id="srcContainer">
          <div className={this.state.amount>100?"green":this.state.amount>30?"brown":"red"}>Balance: {this.state.amount}</div>
          <Link to="/">Transactions</Link>
          <Link to="/operations">Operations</Link>
          <Link to="/BreakDown ">Breakdown </Link>
        </div>
        <Route
           path="/"
          exact
          render={() => <Transcations  transcations={this.state.transcations} />}
        />
        <Route
          path="/operations"
          exact
          render={() =>  <Operations deposit={this.deposit} withdraw={this.withdraw} delete={this.delete} />}
        />
        <Route
          path="/BreakDown"
          exact
          render={() =>  <BreakDown  transcations={this.state.transcations}/>}
        />
      </Router>
      
      
    );
  }

}

