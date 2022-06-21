import React from 'react';
import Web3 from 'web3';

class AllApps extends React.Component{
    render(){
      return (
            <div> 
              <div> Number of Apps : {this.props.appsCount}</div>
              <hr style={{margin: "10px"}}/>
              <ul>
              {
                Object.keys(this.props.apps).map((name, index) => (
                  <li key={`${this.props.apps[index].appName}-${index}`}>
                    <h4>{this.props.apps[index].appName}</h4>
                    <span><b>developer : </b>{this.props.apps[index].appDeveloper}</span>
                  </li>
                ))
              }
              </ul>
            </div>
         );
    }
  }

  export default AllApps;