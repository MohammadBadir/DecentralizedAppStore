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
import { Rating } from '@mui/material';
import { Typography } from '@mui/material';
import { padding } from '@mui/system';

class AppPage extends React.Component{

  constructor(props){
    super(props);
  }

  downloadApp = async(event)=>{
    const spanElement=document.getElementById('downloading '+event.target.dataset.appid);
    const buttonElement=document.getElementById('download '+event.target.dataset.appid);
    spanElement.innerHTML ='downloading...';
    buttonElement.parentNode.replaceChild (spanElement,buttonElement);
    await this.props.downloadApp(event.target.dataset.appid)
    spanElement.innerHTML ='';
    spanElement.parentNode.replaceChild (buttonElement,spanElement);
    setTimeout(function(){
      alert('app has been downloaded successfully')
  }, 100);
  }
    render(){
      return (
            <div> 
              <div style={{marginTop:"20px",marginLeft:"20px"}}>
                    <button className='categotyButton' onClick={this.props.backToApps}>go back</button>
                    <div style={{marginTop:"15px"}}>
                        <img className="app-image-parent" style={{marginBottom:"-20px"}} src={dappImg} width={130}height={130}/> 
                        <h1 style={{marginBottom:"0px"}}className="app-image-child">                   
                             {this.props.app.appName}  
                        </h1>
                        <div style={{verticalAlign:"top",marginTop:"5px"}}>
                            <button  id={"download "+ this.props.app.id}className="DownloadButton" data-appid={this.props.app.id} key={this.props.app.id} onClick={this.downloadApp} >Download</button><br/>
                            <span id={"downloading "+ this.props.app.id} style={{fontSize:"12.5px",color:"gray"}}></span>
                        </div>
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
                            ${this.props.app.price ?? 0}
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
                        </div>

                        <div style={{height:"100px"}}>

                        <fieldset>
                            <legend>Rate the App!</legend>
                            
                            <b style={{marginRight:'5px'}} >Rate : </b>
                            
                            <Rating name="simple-controlled" value={2}  onChange={(event, newValue) => {}}/>

                            <textarea style={{marginTop:'0px',marginBottom:'5px',padding:'5px'}} rows='4' cols='45' placeholder='Write A Review'></textarea>

                            <div style={{marginBottom:'-5px'}}> 
                                <input style={{marginRight:'7px'}} type="checkbox" id='anonymous'></input>
                                <label for="anonymous">Anonymous</label>
                            </div>
                            
                            <button>submit</button>
                        </fieldset>

                      

                        

                        <fieldset>
                            <legend>Other Reviews: </legend>
                            <b>
                                Average Rate :
                            </b>
                            <span style={{fontSize:"15px",color:"darkorange",marginLeft:"10px"}}> 4.5&#9733; </span>
                            <br/>

                            <div style={{height:"10px"}}></div>

                            <b  style={{marginTop:'5px',marginBottom:'1px'}}>mohammad badir</b><br/>
                            <Rating name="read-only" size='small' value={5} readOnly /> <br/>
                            adsad asdsaf 
                            fd fsdfsdfsdf fsd fsdfsdfsdffsadf
                            afdsd sdsa
                            asd 
                            <hr/>
                            <b  style={{marginTop:'5px',marginBottom:'1px'}}>waseem sarsour</b><br/>
                            <Rating name="read-only" size='small' value={3} readOnly /> <br/>
                            adsad asdsaf 
                            fd fsdfsdfsdf fsd fsdfsdfsdffsadf
                            afdsd sdsa
                            asd 
                            <hr/>        
                            <b  style={{marginTop:'5px',marginBottom:'1px'}}>alex</b><br/>
                            <Rating name="read-only" size='small' value={1} readOnly /> <br/>
                            adsad asdsaf 
                            fd fsdfsdfsdf fsd fsdfsdfsdffsadf
                            afdsd sdsa
                            asd 
                            <hr/>
                            
                        </fieldset>
                        <div style={{height:"40px"}}></div>


                        </div>
                    </div>       
                </div>
            </div>
         );
    }

}

  export default AppPage;