import React from 'react';
import Web3 from 'web3';

class TopBar extends React.Component{
    render(){
      return (
        <div id='topBar-background'>
           <div id='topBar'>
           <h1 style={{color: "white"}} id='appName'>dAppStore</h1>
           <button className='topButtons' data-index={0} onClick={this.props.changeView}>Apps</button>
           <button className='topButtons' data-index={1} onClick={this.props.changeView}>My Apps</button>
           <button className='topButtons' data-index={2} onClick={this.props.changeView}>Downloaded</button>
           <button className='topButtons' data-index={3} onClick={this.props.changeView}>Upload App</button>
            <span id="accountNumber">Your account is: {this.props.account}</span>
           </div>
        </div>
         );
  
    }
  }

  export default TopBar;