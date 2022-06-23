import React from 'react';
import Web3 from 'web3';
import Grid from '@mui/material/Grid';

class AllApps extends React.Component{
    render(){
      return (
            <div> 
              <div> Number of Apps : {this.props.appsCount}</div>
              <hr style={{margin: "10px"}}/>
              <Grid container spacing={1}>
              {
                Object.keys(this.props.apps).map((name, index) => (
                  <Grid key={`${this.props.apps[index].appName}-${index}`} item xs={3}>
                    <h4>{this.props.apps[index].appName}</h4>
                    <span><b>developer : </b>{this.props.apps[index].appDeveloper}</span>
                  </Grid>
                ))
              }
              </Grid>
            </div>
         );
    }
  }

  export default AllApps;