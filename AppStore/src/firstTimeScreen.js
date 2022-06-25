import React from 'react';
import Web3 from 'web3';

class FirstTimeScreen extends React.Component{

    constructor(props){
        super(props);
        this.state={
          userNameInput : "",
          userNameEmpty : false
        };
      }
    
      userNameEnteredHandle= async (event) => {  
       event.preventDefault();
       if(this.state.userNameInput==''){
        this.setState({
            userNameEmpty: true
        })
       }else{
        this.setState({
            userNameEmpty:false
        })
        await this.props.updateUserName(this.state.userNameInput)
        this.setState({
         userNameInput : "",
        });
        this.props.toggleFirstTime();
       }
      }
    
       render(){
          return (
           <div>
             <div className='topBar-background'>
                 <div className='topBar'>
                     <h1 style={{color: "white"}} className='appName'>dAppStore</h1>       
                 </div>
              </div>
              <form onSubmit={this.userNameEnteredHandle} style={{size:"50px"}}> 
                <label>
                  <b>Enter a username to proceed:</b><br/>
                    <input  id="userNameInput" onChange={this.inputChangeHandle} name='userNameInput'  value={this.state.userNameInput} placeholder='e.g. wesam' size={40}/>
                    <span style={{fontSize:"0.8em",color:"red"}}>{this.state.userNameEmpty ?  "* username cannot be empty." : ""}</span>
                  </label>
                   <input className="submitButtons" type="submit" value="Continue" />
                </form>
            </div>
             );
        }
    
        inputChangeHandle =(event) => {
          this.setState({
            [event.target.name] : event.target.value
          });
        }

  }

  export default FirstTimeScreen;