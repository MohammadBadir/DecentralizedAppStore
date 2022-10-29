import React from 'react';
import Web3 from 'web3';
import Grid from '@mui/material/Grid';
import  dappImg from "./dapp.jpg";
import Card from "@mui/material/Card";

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
        <div>
          <div style={{marginTop:"15px"}}>
            <input className="searchInput" onChange={this.searchChange} value={this.state.searchedApp} placeholder='Search App'/>
          </div>
          <Grid className="appsGrid" container spacing={5} rowSpacing={8} style={{marginTop:"10px",marginLeft:"10px"}}>
              {
                this.props.downloadedApps.filter(
                  (app)=>{
                    return app.appName.toLowerCase().includes(this.state.searchedApp.toLowerCase())
                  }
                ).map((app, index) => (
                  <Grid  key={`${app.appName}-${index}`} item xs={4}>
                  <Card style={{height:"65px", width:"300px",padding:"10px", border: "none", boxShadow: "none" }}className="appCard" onClick={()=>{this.props.openAppPage(app.id)}}>
                    <div style={{display:"inline-block",verticalAlign:"top"}}>
                      <img src={`https://ipfs.fleek.co/ipfs/${app.appLogoHash}`} width={50}height={52}/>
                    </div>
                    <div style={{display:"inline-block",verticalAlign:"top",marginLeft:"20px",marginTop:"-8px"}}>
                      <b style={{fontSize:"18px"}}>{app.appName}</b><br/>
                      <span style={{fontSize:"14px"}}>{app.category}</span><br/>
                      <span style={{fontSize:"14px",color:"darkorange"}}>{(app.reviews.map((review)=>(parseInt(review.rating))).reduce((a, b) => a + b,0)/(app.reviews.length==0?1:app.reviews.length)).toFixed(1)}&#9733;</span>
                    </div>
                    </Card>
                  </Grid>
                ))
              }
              </Grid>
        </div>
        );
    }
  }

  export default DownloadedApps;