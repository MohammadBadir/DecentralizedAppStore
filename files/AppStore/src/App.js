import React from 'react';
import Web3 from 'web3';
import './App.css'
import { APP_STORE_ABI, APP_STORE_ADDRESS } from './config';
import TopBar from './TopBar.js';
import AppsView from './AppsView.js';
import MyApps from './MyApps.js';
import DownloadedApps from './DownloadedApps.js';
import UploadApp from './UploadApp.js';




class App extends React.Component {

  constructor(props){
    super(props);

    this.categories=["Education", "Entertainment", "News", "Sports", "Music", "Shopping", "Business"];
    this.state={
      currentView: 0, // apps=0,myapps=1,deownloaded=2,uploadapp=3...
      account : "",
      appStoreContract : [],
      apps :[],
      downloadedApps:[],
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

      let mydownloadedApps = await contract.methods.getDownloadedApps(this.state.account).call();
      let downloadedAppsTemp=[];
      let iterator=0;
      while(mydownloadedApps[iterator]!=undefined){
        const app = await contract.methods.apps(mydownloadedApps[iterator]).call();
        downloadedAppsTemp=[...downloadedAppsTemp,app]
        iterator++;
      }
      this.setState({
        downloadedApps : [...downloadedAppsTemp]
      });
      }
    load();
  }


  render(){
    if(this.state.currentView==0){
       return (
        <div>
             <TopBar account={this.state.account} changeView={this.changeView}/>
             <AppsView  downloadApp={this.downloadApp} appsCount={this.state.appsCount} categories={this.categories} apps={this.state.apps}/>
        </div>
       );
    }else if(this.state.currentView==1){
      return (
        <div>
             <TopBar account={this.state.account} changeView={this.changeView}/>
             <MyApps/>
        </div>
       );
    }else if(this.state.currentView==2){
      return (
        <div>
             <TopBar account={this.state.account} changeView={this.changeView}/>
             <DownloadedApps downloadedApps={this.state.downloadedApps}/>
        </div>
       );
    }else if(this.state.currentView==3){
      return (
        <div>
             <TopBar account={this.state.account} changeView={this.changeView}/>
             <UploadApp categories={this.categories} addNewApp={this.addNewApp}/>
        </div>
       );
    }
  }


  addNewApp = async (appName,appCategory,AppDescription,appDeveloper)=>{

    await this.state.appStoreContract.methods.createApp(appName,appCategory,AppDescription,appDeveloper).send({from : this.state.account});
    const newApp=await this.state.appStoreContract.methods.apps(this.state.appsCount+1).call();

    this.setState(oldState => ({
      apps : [...oldState.apps,newApp],
      appsCount : oldState.appsCount+1 
    }))
  }

  changeView=(event)=>{
    const newViewIndex=event.target.dataset.index;
    this.setState({
      currentView : newViewIndex,
    })
  }

  downloadApp = async (appId) =>{
    await this.state.appStoreContract.methods.downloadApp(this.state.account,appId).send({from : this.state.account});
    const app = await this.state.appStoreContract.methods.apps(appId).call();
    this.setState(oldState=>({
      downloadedApps : [...oldState.downloadedApps,app]
    }))
  }
}

export default App;