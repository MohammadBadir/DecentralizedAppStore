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


class AppsView extends React.Component{

  constructor(props){
    super(props);
    this.state={
      categoryView : "All",
      searchedApp : "",
    };
  }

  searchChange =(event)=>{
    this.setState({
      searchedApp:event.target.value
    })
  }
    render(){
      return (
            <div> 
              <div style={{marginTop:"15px",marginLeft:"15px"}}>
              <button id="defaultCategory" className="categoryButtons" key="All" data-category="All" onClick={this.changeCategoryView} style={{marginRight:"15px"}}>All</button>
              {
              this.props.categories.map((category,index)=>(
                <button className="categoryButtons" key={category} data-category={category} onClick={this.changeCategoryView} style={{display:"inline-block",marginRight:"15px"}}>{category}</button>
              )
              )
              }
              <input  className="searchInput" onChange={this.searchChange} value={this.state.searchedApp} placeholder='Search App'/>
             
              </div>
              <Grid className="appsGrid" container spacing={5} rowSpacing={8} columnSpacing={0} style={{marginTop:"10px",marginLeft:"10px"}}>
              {
                this.props.apps.filter( 
                  (app)=>{
                  return (this.state.categoryView=="All" || app.category==this.state.categoryView)
                }).filter(
                  (app)=>{
                    return app.appName.includes(this.state.searchedApp)
                  }
                ).map((app, index) => (
                  <Grid  key={`${app.appName}-${index}`} item xs={4}>
                  <Card style={{height:"65px", width:"300px",padding:"10px", border: "none", boxShadow: "none" }}className="appCard" onClick={()=>{}}>
                    <div style={{display:"inline-block",verticalAlign:"top"}}>
                      <img src={dappImg} width={50}height={52}/>
                    </div>
                    <div style={{display:"inline-block",verticalAlign:"top",marginLeft:"20px",marginTop:"-8px"}}>
                      <b style={{fontSize:"18px"}}>{app.appName}</b><br/>
                      <span style={{fontSize:"14px"}}>{app.category}</span><br/>
                      <span style={{fontSize:"14px",color:"darkorange"}}>4.5</span>
                    </div>
                    <div style={{pointerEvents:"auto", display:"inline-block",verticalAlign:"top",marginTop:"5px",marginLeft:"30px"}}>
                        <button  id={"download "+ app.id}className="downloadButton" data-appid={app.id} key={app.id} onClick={this.downloadApp} >Download</button><br/>
                        <span id={"downloading "+ app.id} style={{fontSize:"12.5px",color:"gray"}}></span>
                    </div>
                    </Card>
                  </Grid>
                ))
              }
              </Grid>
            </div>
         );
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

    changeCategoryView = (event) => {
      const category=event.target.dataset.category
      this.setState({
        categoryView : category
      });
      var elements = document.getElementsByClassName('categoryButtons'); 
      for(var i = 0; i < elements.length; i++){
        elements[i].style.color = "rgb(36, 41, 46)";
        elements[i].style.backgroundColor = 'rgb(250, 251, 252)';

      }
      event.target.style.color='white'
      event.target.style.backgroundColor='rgb(111, 109, 227)'
    }
  }

  export default AppsView;