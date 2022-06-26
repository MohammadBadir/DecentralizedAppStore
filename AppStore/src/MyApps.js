import React from 'react';
import Web3 from 'web3';
import Grid from '@mui/material/Grid';
import  dappImg from "./dapp.jpg";
import Card from "@mui/material/Card";


class MyApps extends React.Component{

  constructor(props){
    super(props);
    this.state={
      searchedApp : "",
    };
  }


  render(){
    return (
       <div style={{marginTop:"15px"}}>
        <input className="searchInput" onChange={this.searchChange} value={this.state.searchedApp} placeholder='Search App'/>
        <Grid className="appsGrid" container spacing={5} rowSpacing={8} style={{marginTop:"10px",marginLeft:"10px"}}>
            {
            this.props.uploadedApps.filter(
                  (app)=>{
                    return app.appName.includes(this.state.searchedApp)
                  }
                  ).map((app, index) => (
                    <Grid  key={`${app.appName}-${index}`} item xs={4}>
                    <Card style={{height:"65px", width:"300px",padding:"10px", border: "none", boxShadow: "none" }}className="appCard" onClick={()=>{alert('hi')}}>
                      <div style={{display:"inline-block",verticalAlign:"top"}}>
                        <img src={dappImg} width={50}height={52}/>
                      </div>
                      <div style={{display:"inline-block",verticalAlign:"top",marginLeft:"20px",marginTop:"-8px"}}>
                        <b style={{fontSize:"18px"}}>{app.appName}</b><br/>
                        <span style={{fontSize:"14px"}}>{app.category}</span><br/>
                        <span style={{fontSize:"14px",color:"darkorange"}}>4.5&#9733;</span>
                      </div>
                      </Card>
                    </Grid>
                  ))
              }
              </Grid>
        </div>
        );
    }

    
    searchChange =(event)=>{
      this.setState({
        searchedApp:event.target.value
      })
    }
  }


  export default MyApps;