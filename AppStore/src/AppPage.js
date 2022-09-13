import React from 'react';
import Web3 from 'web3';
import Grid from '@mui/material/Grid';
import  dappImg from "./dapp.jpg";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import SelectInput from '@mui/material/Select/SelectInput';
import { wait } from '@testing-library/user-event/dist/utils';
import { IconButton } from '@mui/material';


class AppPage extends React.Component{

  constructor(props){
    super(props);
  }

    render(){
      return (
            <div> 
              <div style={{marginTop:"20px",marginLeft:"20px"}}>
                    <h2>                   
                     {this.props.app.appName} 
                    </h2>
                    <button className='categotyButton' onClick={this.props.backToApps}>back</button>
                </div>
            </div>
         );
    }

}

  export default AppPage;