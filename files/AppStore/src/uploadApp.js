import React from 'react';
import Web3 from 'web3';

class UploadApp extends React.Component{
    render(){
      return (
        <div>
            <input placeholder='enter app name' id='appNameInput'/>
            <input placeholder='enter developer name' id='developerNameInput'  style={{marginLeft: "5px"}}/>
            <button onClick={this.props.addNewApp} style={{marginLeft: "5px"}} >upload app</button>
        </div>
         );

    }
  }

  export default UploadApp;