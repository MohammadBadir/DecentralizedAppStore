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
import  defaultLogo from "./defaultLogo.jpeg";


class AppPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
             ratingInput : 0,
             reviewInput : "",
            };
  } 
    render(){
    //    console.log(JSON.stringify(this.props.app, null, 4));
    //    console.log(JSON.stringify(this.props.app.reviews, null, 4));
        return (
            <div> 
                <div style={{marginTop:"20px",marginLeft:"20px"}}>
                    <button className='GoBackBtn' onClick={this.props.backToApps}>{" back"}</button>
                    <div style={{marginTop:"15px"}}>
                        <img className="app-image-parent" style={{marginBottom:"-20px"}} src={this.props.app.appLogoHash=='default'?defaultLogo:`https://ipfs.fleek.co/ipfs/${this.props.app.appLogoHash}`} width={150}height={150}/> 
                        <h1 style={{marginBottom:"0px"}}className="app-image-child">                   
                             {this.props.app.appName}  
                        </h1>
                        <div style={{verticalAlign:"top",marginTop:"5px"}}>
                            <button  id={"download "+ this.props.app.id}className="DownloadButton" data-appid={this.props.app.id} key={this.props.app.id} onClick={this.downloadApp} >{((this.props.isPurchased)||(this.props.app.developerAddress==this.props.currentAccount))?"Download":"Buy"}</button><br/>
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
                            {this.props.app.priceCurrency=='USD'? ('$'+parseFloat(parseFloat(this.props.app.price).toFixed(3)) + ' ≈ '+parseFloat(parseFloat(this.props.app.price/this.props.conversionRate).toFixed(3))+'ETH') : (parseFloat(parseFloat(this.props.app.price/1000000000).toFixed(3))+'ETH ≈ $'+parseFloat(parseFloat(this.props.app.price*this.props.conversionRate/1000000000).toFixed(3))) } 
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
                            
                            <Rating name="simple-controlled" value={this.state.ratingInput}  onChange={(event, newValue) => {
                                this.setState({
                                    ratingInput:newValue
                                  });
                            }}/>

                            <textarea onChange={this.inputChangeHandle}  name='reviewInput' value={this.state.reviewInput} style={{marginTop:'0px',marginBottom:'5px',padding:'5px'}} rows='4' cols='45' placeholder='Write A Review'></textarea>

                            <div style={{marginBottom:'-5px'}}> 
                                <input style={{marginRight:'7px'}} type="checkbox" id='anonymousCheckbox' ></input>
                                <label htmlFor="anonymousCheckbox">Post Without Name</label>
                            </div>
                            
                            <button onClick={this.addReview}>Submit</button>
                        </fieldset>

                        <fieldset>
                            <legend>Other Reviews: </legend>
                            {   this.props.app.reviews.length==0?<b>No Reviews Yet!</b> 
                                :
                                <b> Average Rate : </b>
                            }
                            {   this.props.app.reviews.length==0?<b></b>
                                :
                                <span style={{fontSize:"15px",color:"darkorange",marginLeft:"10px"}}> {(this.props.app.reviews.map((review)=>(parseInt(review.rating))).reduce((a, b) => a + b,0)/(this.props.app.reviews.length)).toFixed(1)+String.fromCodePoint(9733)}</span>
                            }
                            <br/>
                            <div style={{height:"10px"}}></div>

                            {
                                this.props.app.reviews.map((reviewAndRating,index)=>(
                                        <Review key={`${reviewAndRating.name}-${index}`} name={reviewAndRating.name} rating={parseInt(reviewAndRating.rating)} review={reviewAndRating.review}></Review>
                                )).reverse()
                            }

                            <div style={{height:"15px"}}></div>
                        </fieldset>
                        <div style={{height:"40px"}}></div>

                        </div>
                    </div>       
                </div>
            </div>
        );
    }

    downloadApp = async(event)=>{
        const spanElement=document.getElementById('downloading '+event.target.dataset.appid);
        const buttonElement=document.getElementById('download '+event.target.dataset.appid);
        spanElement.innerHTML ='downloading...';
        buttonElement.parentNode.replaceChild (spanElement,buttonElement);
        let appHash
        try{
            await this.props.contract.methods.purchaseApp(event.target.dataset.appid).send({from : this.props.currentAccount,value: this.props.app.price/(this.props.app.priceCurrency=='USD'?1000000000:1)});
            appHash=await this.props.contract.methods.getAppHash(event.target.dataset.appid).call();
            if(!this.props.purchasedApps.map((app)=>app.id).includes(event.target.dataset.appid) && !this.props.isMyApp){ // to avoid duplicates 
                this.props.downloadApp();
            }
            spanElement.innerHTML ='';
            spanElement.parentNode.insertBefore(buttonElement,spanElement.nextSibling);
            window.open(`https://ipfs.io/ipfs/${appHash}`, '_blank');
            window.location.reload();

        }catch(err){ // to handle errors and not enough ether etc... 
            if(err.message.includes("Not enough money")){
                alert("Not Enough Money!")
            } else {
                alert("An Error has occured")
            }
            spanElement.innerHTML ='';
            spanElement.parentNode.insertBefore(buttonElement,spanElement.nextSibling);
            return;
        }
     //   if (window.confirm('Press Ok to Confirm')){
  //      };
    //    setTimeout(function(){
     //     alert('app has been downloaded successfully')
   //   }, 100);
      }
    
    
      inputChangeHandle =(event) => {
        this.setState({
          [event.target.name] : event.target.value
        });
      }
    
      addReview=async()=>{
        await this.props.addReview(this.props.app.id,this.state.ratingInput,this.state.reviewInput,document.getElementById("anonymousCheckbox").checked)
        this.setState({
            ratingInput : 0,
            reviewInput : "",
        });
      }

}


class Review extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
                 <b  style={{fontSize:'14px',marginTop:'5px',marginBottom:'1px'}}>{this.props.name}</b><br/>
                 <Rating name="read-only" size='small' value={this.props.rating} readOnly /> <br/>
                 {this.props.review}
                 <hr/>
            </div>
    
     );
    }
}

  export default AppPage;