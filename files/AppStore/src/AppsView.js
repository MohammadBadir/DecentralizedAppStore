import React from 'react';
import Web3 from 'web3';
import Grid from '@mui/material/Grid';
import  dappImg from "./dapp.png";
import { TextField } from '@mui/material';

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
              <button className="categoryButtons" key="All" data-category="All" onClick={this.changeCategoryView} style={{marginRight:"15px"}}>All</button>
              {
              this.props.categories.map((category,index)=>(
                <button className="categoryButtons" key={category} data-category={category} onClick={this.changeCategoryView} style={{display:"inline-block",marginRight:"15px"}}>{category}</button>
              )
              )
              }
              <input className="searchInput" onChange={this.searchChange} value={this.state.searchedApp} placeholder='Search App'/>
              </div>
              <Grid id="appsGrid" container spacing={1} rowSpacing={1} style={{marginTop:"35px"}}>
              {
                this.props.apps.filter( 
                  (app)=>{
                  return (this.state.categoryView=="All" || app.category==this.state.categoryView)
                }).filter(
                  (app)=>{
                    return app.appName.includes(this.state.searchedApp)
                  }
                ).map((app, index) => (
                  <Grid key={`${app.appName}-${index}`} item xs={4}>
                    <div style={{display:"inline-block",verticalAlign:"top"}}>
                      <img src={dappImg} width={120}height={120}/>
                    </div>
                    <div style={{display:"inline-block",marginTop:"25px"}}>
                      <b style={{fontSize:"18px"}}>{app.appName}</b><br/>
                      <span style={{fontSize:"14px"}}>{app.category}</span><br/>
                      <button data-appid={app.id} key={app.id} onClick={this.downloadApp} style={{marginTop:"3px"}}>Download</button>
                    </div>
                  </Grid>
                ))
              }
              </Grid>
            </div>
         );
    }
    downloadApp = async(event)=>{
      await this.props.downloadApp(event.target.dataset.appid)
      alert('app has been downloaded successfully')
    }

    changeCategoryView = (event) => {
      const category=event.target.dataset.category
      this.setState({
        categoryView : category
      });
    }
  }

  export default AppsView;