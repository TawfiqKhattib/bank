import React, { Component } from "react";
// import Transcations from "./Transactions";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './Operations.css'

export default class Operations extends Component {
    constructor(){
        super();
        this.state={
            amount:"",
            vendor:"",
            category:""
        }
        this.change=this.change.bind(this);
        this.deposit=this.deposit.bind(this);
        this.withdraw=this.withdraw.bind(this);
        this.delete=this.delete.bind(this);
    }

    change(e){
        let inputVal = e.target.value;
        let id = e.target.id;
        if(id==="amount-input"){
            this.setState({amount:inputVal})
        }
        else if(id==="vendor-input"){
            this.setState({vendor:inputVal})
        }
        else{
            this.setState({category:inputVal})
        }
    }

    deposit(){
        if(this.state.amount==="" || this.state.vendor==="" || this.state.category===""){
            this.props.deposit({});
        }
        else{
            this.props.deposit({amount: parseInt(this.state.amount),vendor:this.state.vendor,category:this.state.category,color:true})
            this.setState({ amount: "",vendor:"",category:"" });
        }
    }
    withdraw(){
        if(this.state.amount==="" || this.state.vendor==="" || this.state.category===""){
            this.props.withdraw({});
        }
        else{
            this.props.withdraw({amount: parseInt(this.state.amount),vendor:this.state.vendor,category:this.state.category,color:false})
            this.setState({ amount: "",vendor:"",category:"" });
        }
    }

    delete(){
        if(this.state.amount==="" || this.state.vendor==="" || this.state.category===""){
            this.props.delete({});
        }
        else{
            this.props.delete({amount: parseInt(this.state.amount),vendor:this.state.vendor,category:this.state.category})
            this.setState({ amount: "",vendor:"",category:"" });
        }
    }

    render() {
      return (

            <div id="container">
                <div id="input-container">
                    <input id="amount-input" placeholder="amount" value={this.state.amount} onChange={this.change}/>
                    <input id="vendor-input" placeholder="vendor" value={this.state.vendor} onChange={this.change}/>
                    <input id="category-input" placeholder="category" value={this.state.category} onChange={this.change}/>
                </div>
                <div id="btn-container">
                    <button id="deposit" onClick={this.deposit}>Deposit</button>
                    <button id="withdraw" onClick={this.withdraw}>withdraw</button>
                    <button id="delete" onClick={this.delete}>Delete</button>
                </div>
            </div>

      );
    }
}