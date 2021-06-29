import React, { Component } from "react";
import "./App.css";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Operations from "./components/Operations";
import Transcations from "./components/Transactions";
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class App extends Component {
  constructor(){
    super();
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

  amount(transcations){
    let sum = 0;
    for(let elem of transcations){
        sum+=elem.amount     
    }
    return sum;
  }

  async deposit(transactionObj){
   await axios.post("http://localhost:3500/transactions",{data: transactionObj})
  // await axios.post("/transactions",{data: transactionObj})
    await this.getData()
    // if(transactionObj!=={})
    //   {
    //     this.setState({
    //       transcations: [...this.state.transcations, transactionObj]
    //     })
    //   }
     
  }
  async withdraw(transactionObj){
    await axios.post("http://localhost:3500/transactions",{ data: transactionObj})
    // await axios.post("/transactions",{ data: transactionObj})
    await this.getData()
    // if(transactionObj!=={})
    //   {
    //     this.setState({
    //       transcations: [...this.state.transcations, transactionObj]
    //     })
    //   }
  }
  async delete(transactionObj){
    await axios.delete("http://localhost:3500/transactions",{data:{transactionObj}});
    // await axios.delete("/transactions",{data:{transactionObj}});
    await this.getData()
  //   if(transactionObj!=={}){
  //     let arr = [...this.state.transcations];
  //     for(let index in arr){
  //       if(transactionObj.amount===arr[index].amount && transactionObj.vendor===arr[index].vendor
  //         && transactionObj.category===arr[index].category){
  //         arr.splice(index,1);
  //       }
  //     }
  //     this.setState({ transcations: arr });
  //  }
  }

   async getData(){
    //  await axios.get("/transactions").then(res=>{this.setState({transcations:res})});
     let transcations =await axios.get("http://localhost:3500/transactions");
    // let transcations =await axios.get("/transactions");
    let transcationsData=transcations.data;
    let amountTotal = this.amount(transcationsData)
     this.setState({transcations:transcationsData,amount:amountTotal});
  }

  async componentDidMount() {
    await this.getData()
    // this.setState({ transcations: response.data })
  }
  render() {
  
    return (
      <Router>
        <div>
          <div className={this.state.amount>100?"green":this.state.amount>30?"brown":"red"}>Balance: {this.state.amount}</div>
          {/* <Transcations transcations={this.state.transcations}/> */}
          <Link to="/"></Link>
          <Operations deposit={this.deposit} withdraw={this.withdraw} delete={this.delete} />
          
        </div>
        <Route
         path="/"
        exact
        render={() => <Transcations  transcations={this.state.transcations} />}
        />
      </Router>
    );
  }

}

