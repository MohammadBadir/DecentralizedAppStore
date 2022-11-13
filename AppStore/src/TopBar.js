import React from 'react';
import Web3 from 'web3';

class TopBar extends React.Component{
    render(){
      return (
        <div className='topBar-background'>
           <div className='topBar'>
              <h1 style={{color: "white",fontFamily: "cursive"}} className='appName'>Decentralized Appstore</h1>
              <button id='defaultAppsView' className='topButtons' data-index={0} onClick={this.props.changeView}>Browse</button>
              <button className='topButtons' data-index={1} onClick={this.props.changeView}>My Apps</button>
              <button className='topButtons' data-index={2} onClick={this.props.changeView}>Purchases</button>
              <button className='topButtons' data-index={3} onClick={this.props.changeView}>Publish App</button>
              <span  style={{fontSize:"18px"}}  id="accountNumber">Logged in as: {this.props.userName}</span>
           </div>
        </div>
         );
    }
  }

  export default TopBar;