import React from 'react';
import Web3 from 'web3';
import Grid from '@mui/material/Grid';
import  dappImg from "./dapp.png";

class AppsView extends React.Component{

  constructor(props){
    super(props);
    this.state={
      categoryView : "All",
    };
  }

    render(){
      return (
            <div> 
              <div style={{marginTop:"15px",marginLeft:"15px"}}>
              <button key="All" data-category="All" onClick={this.changeCategoryView} style={{marginRight:"15px"}}>All</button>
              {
              this.props.categories.map((category,index)=>(
                <button key={category} data-category={category} onClick={this.changeCategoryView} style={{marginRight:"15px"}}>{category}</button>
              )
              )
              }
              </div>
              <Grid id="appsGrid" container spacing={1} rowSpacing={1} style={{marginTop:"35px"}}>
              {
                this.props.apps.filter( 
                  (app)=>{
                  return (this.state.categoryView=="All" || app.category==this.state.categoryView)
                }).map((app, index) => (
                  <Grid key={`${app.appName}-${index}`} item xs={4}>
                    <div style={{display:"inline-block",verticalAlign:"top"}}>
                      <img src={dappImg} width={120}height={120} alt='Large Pizza'/>
                    </div>
                    <div style={{display:"inline-block",marginTop:"30px"}}>
                      <b  style={{fontSize:"18px"}}>{app.appName}</b><br/>
                     <span style={{fontSize:"14px"}}>{app.category}</span>
                    </div>


                  </Grid>
                ))
              }
              </Grid>
            </div>
         );
    }
    
    changeCategoryView = (event) => {
      const category=event.target.dataset.category
      this.setState({
        categoryView : category
      });
    }
  }

  export default AppsView;