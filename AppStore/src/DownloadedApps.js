import React from 'react';
import Web3 from 'web3';
import Grid from '@mui/material/Grid';
import  dappImg from "./dapp.png";

class DownloadedApps extends React.Component{

  constructor(props){
    super(props);
    this.state={
      searchedApp : "",
    };
  }

  searchChange =(event)=>{
    this.setState({
      searchedApp:event.target.value
    })
  }

    render(){
      return (
        <div style={{marginTop:"15px"}}>
          <input className="searchInput" onChange={this.searchChange} value={this.state.searchedApp} placeholder='Search App'/>
          <Grid className="appsGrid" container spacing={1} rowSpacing={1} style={{marginTop:"35px"}}>
              {
                this.props.downloadedApps.filter(
                  (app)=>{
                    return app.appName.includes(this.state.searchedApp)
                  }
                ).map((app, index) => (
                  <Grid key={`${app.appName}-${index}`} item xs={4}>
                    <div style={{display:"inline-block",verticalAlign:"top"}}>
                      <img src={dappImg} width={120}height={120}/>
                    </div>
                    <div style={{display:"inline-block",marginTop:"25px"}}>
                      <b  style={{fontSize:"18px"}}>{app.appName}</b><br/>
                     <span style={{fontSize:"14px"}}>{app.category}</span><br/>
                    </div>
                  </Grid>
                ))
              }
              </Grid>
        </div>
        );
    }
  }

  export default DownloadedApps;