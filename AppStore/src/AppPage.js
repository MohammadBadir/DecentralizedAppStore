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
                    <button className='categotyButton' onClick={this.props.backToApps}>back</button>
                    <div style={{marginTop:"15px"}}>
                        <img className="app-image-parent" style={{marginBottom:"-20px"}} src={dappImg} width={130}height={130}/> 
                        <h1 className="app-image-child">                   
                             {this.props.app.appName} 
                        </h1>
                    </div>

                    <div>    
                        <h3>         
                             About the app:           
                        </h3>    

                        <div>
                        <b>
                            Description
                        </b>
                        <br></br>
                        {this.props.app.appDescription} 
                        </div>
                        <hr/>

                        <div >
                            <b>
                            Price
                            </b>
                            <br></br>
                            $20
                        </div>
                        <hr/>

                        <div>
                            <b>
                             Category
                            </b>
                            <br></br>
                            {this.props.app.category} 
                        </div>
                        <hr/>
                        <div >
                            <b>
                            Developer
                            </b>
                            <br></br>
                            {this.props.app.appDeveloper} 
                        </div>
                        <hr/>

            
                        <div >
                            <b>
                            Reviews & Ratings :
                            </b>
                            <span style={{fontSize:"14px",color:"grey",marginLeft:"10px"}}> 4.5&#9733; </span>
                            <br></br>
                        </div>


                        <div style={{height:"100px"}}>

                        </div>
                    </div>       
                </div>
            </div>
         );
    }

}

  export default AppPage;