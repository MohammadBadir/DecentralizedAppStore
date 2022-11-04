import React from 'react';
import Web3 from 'web3';

class TopBar extends React.Component{
    render(){
      return (
        <div className='topBar-background'>
           <div className='topBar'>
           <h1 style={{color: "white"}} className='appName'>dAppStore</h1>
           <button id='defaultAppsView' className='topButtons' data-index={0} onClick={this.props.changeView}>Apps</button>
           <button className='topButtons' data-index={1} onClick={this.props.changeView}>My Apps</button>
           <button className='topButtons' data-index={2} onClick={this.props.changeView}>Downloaded</button>
           <button className='topButtons' data-index={3} onClick={this.props.changeView}>Upload App</button>
            <span  style={{fontSize:"18px"}}  id="accountNumber">Welcome, {this.props.userName}</span>
           </div>
        </div>
         );
  
    }
  }

  export default TopBar;