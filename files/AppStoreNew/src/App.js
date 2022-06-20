import { useEffect, useState } from 'react';
import React from 'react';
import Web3 from 'web3';
import { APP_STORE_ABI, APP_STORE_ADDRESS } from './config';


class App extends React.Component {

  constructor(props){
    super(props);
    this.state={
      account : "",
      appStoreContract : [],
      apps :[],
      appNameInput : "",
      developerNameInput : "",
      appsCount : 0 
    };

  }

  componentDidMount(){
     const load = async ()=>{
      const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
      const accounts = await web3.eth.requestAccounts();
      const contract = new web3.eth.Contract(APP_STORE_ABI, APP_STORE_ADDRESS);
      const counter = await contract.methods.appsCount().call();
      this.setState({
        account :accounts[0],
        appStoreContract : contract,
        appsCount : parseInt(counter)
      })
      let appsTemp=[];
      for (var i = 1; i <= counter; i++) {
        const app = await contract.methods.apps(i).call();
        appsTemp=[...appsTemp,app]
      }
      this.setState({
        apps : [...appsTemp]
      });
    }
    load();
  }

 addNewApp = async ()=>{
    const appName=document.getElementById("appNameInput").value;
    const developerName=document.getElementById("developerNameInput").value;
    await this.state.appStoreContract.methods.createApp(appName,developerName).send({from : this.state.account});
    const newApp=await this.state.appStoreContract.methods.apps(this.state.appsCount+1).call();
    this.setState(oldState => ({
      apps : [...oldState.apps,newApp],
      appsCount : oldState.appsCount+1 
    }))
    document.getElementById("appNameInput").value='';
    document.getElementById("developerNameInput").value='';
  }

  render(){
    return (
      <div style={{margin: "10px"}}> 
        Your account is: {this.state.account}
        <h1 style={{color: "blue"}}>Apps</h1>
        <input placeholder='enter app name' id='appNameInput'/>
        <input placeholder='enter developer name' id='developerNameInput'  style={{marginLeft: "5px"}}/>
        <button onClick={this.addNewApp} style={{marginLeft: "5px"}} >upload app</button>
        <div> Number of Apps : {this.state.appsCount}</div>
        <hr style={{margin: "10px"}}/>
        <ul>
        {
          Object.keys(this.state.apps).map((name, index) => (
            <li key={`${this.state.apps[index].appName}-${index}`}>
              <h4>{this.state.apps[index].appName}</h4>
              <span><b>developer : </b>{this.state.apps[index].appDeveloper}</span>
            </li>
          ))
        }
        </ul>
      </div>
    );
  }
}

export default App;