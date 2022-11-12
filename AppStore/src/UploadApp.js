import React from 'react';
import Web3 from 'web3';

import fleekStorage from '@fleekhq/fleek-storage-js'
import { FastfoodOutlined } from '@mui/icons-material';
const FLEEK_API_KEY='EvylP8PA/dw/vRh5P7ntRQ==';
const FLEEK_API_SECRET='4nZd2m+n3HB9U+iKP8629yetFoipqZKjjrVW4/L3VaM=';



let appLogoHash='';
let appFileHash='';
class UploadApp extends React.Component{
  constructor(props){
    super(props);
    this.state={
      appNameInput : "",
      categoryInput : "Education",
      appDescriptionInput : "",
      appNameEmpty : false,
      priceNegative: false,
      appPriceInput: '',
      convertedValue:'',
      appLogoBuffer: null,
      appFileBuffer: null,
      selectedCurrency : 'ETH'
    };
  }
  
  
  render(){
      return (
       <div>
          <form onSubmit={this.addNewApp} style={{size:"90px"}}> 

            <label>
              <b>App name</b>      
                <input  onChange={this.inputChangeHandle} name='appNameInput' id='appNameInput' value={this.state.appNameInput} placeholder='enter app name' size={53}/>
                <span style={{fontSize:"0.8em",color:"red"}}>{this.state.appNameEmpty ?  "* App name cannot be empty." : ""}</span>
              </label>

              <label>
              <b>Price</b> 
              <div className='appPrices'>     
                <select  onChange={this.chooseCurrency} value={this.state.selectedCurrency} className='appPricesCells' name="currency" id="currency" style={{height : '28px',width:'73px'}}>
                  <option value="USD">USD</option>
                  <option value="ETH">ETH</option>
                </select>    
                <input  className='appPricesCells' disabled={true} onChange={()=>{}} value={this.state.selectedCurrency=='ETH'?"USD":"ETH"} name='appPriceInput' style={{height : '24px',width:'72px'}}></input>
                <br></br>
                <input  className='appPricesCells'onChange={this.inputChangeHandle} value={this.state.appPriceInput} name='appPriceInput' type="number" style={{height : '24px',width:'65px'}}></input>
                <input  className='appPricesCells' disabled={true} onChange={()=>{}} value={this.state.convertedValue}   type="number" style={{height : '24px',width:'72px'}}></input>
                <br></br>
                <span style={{fontSize:"0.8em",color:"red"}}>{this.state.priceNegative ?  "* Price cannot be less than 0" : ""}</span>
              </div>
              </label>

              <label>
              <b>Category</b>
              <select onChange={this.selectCategory} id="appCategory" value={this.state.categoryInput} name="appCategory">
                {
                this.props.categories.map((category, index) => (
                  <option key={category} value={category}>{category}</option>
                ))
                }
              </select>
              </label>

              <label>
                <b>App description</b>
                <textarea onChange={this.inputChangeHandle} name='appDescriptionInput'  id='appDescriptionInput' value={this.state.appDescriptionInput} rows="5" cols="50"/>
              </label>

              <label>
                <b>App logo</b>
                <input data-buffer={"appLogoBuffer"} type="file" onChange={this.inputLogoChangeHandle} id='appLogoInput'/>
              </label>
             
              <label>
                <b>Upload App file</b>
                <input data-buffer={"appFileBuffer"} type="file" onChange={this.inputLogoChangeHandle} id='appFileInput'/>
              </label>

              <input  id="submitAppBtn" className="submitButtons" type="submit" value="Submit" />

            </form>
        </div>
         );
    }

    chooseCurrency = (event)=>{
      this.setState({
        selectedCurrency : event.target.value,
        appPriceInput : '',
        convertedValue : '',
      });
    }

    inputChangeHandle =(event) => {
      this.setState({
        [event.target.name] : event.target.value
      });
      if(event.target.name=='appPriceInput'){
        let res=parseFloat(event.target.value);
        if(res<0.0){
          this.setState({
            priceNegative : true,
            convertedValue : '',
          })
          return;
        }else{
          this.setState({
            priceNegative : false,
          });
          this.calculatedNewConvertedValue(event.target.value);
        }

      }
    }
    calculatedNewConvertedValue = (from)=> {
      if(this.state.selectedCurrency=='ETH'){
        this.setState({
          convertedValue : from*this.props.conversionRate,
        }); 
      }else{
        this.setState({
          convertedValue : from/this.props.conversionRate,
        }); 
      }
    }

    inputLogoChangeHandle = (event) => {
      event.preventDefault()
      const file = event.target.files[0]
      if(file=='' || file== undefined || file==null) return
      const reader = new window.FileReader()
      reader.readAsArrayBuffer(file)
      reader.onloadend = () => {
        this.setState({ [event.target.dataset.buffer] : Buffer(reader.result) })
      }
    }

    addNewApp = async (event) =>{
      event.preventDefault();
      if(this.state.appNameInput==''){
        this.setState({
          appNameEmpty:true
        })
        return;
      }else{
        this.setState({
          appNameEmpty:false
        })
      }
      if(this.state.priceNegative){
        return;
      }
  
      await this.uploadFilesToIpfs()
      await this.props.addNewApp(this.state.appNameInput,this.state.categoryInput,this.state.appDescriptionInput,this.state.appPriceInput,this.state.selectedCurrency,appLogoHash,appFileHash)
      this.setState({
        appNameInput : "",
        appDescriptionInput : "",
        appPriceInput : '0'
      }); 
      document.getElementById('appLogoInput').value=null;
      document.getElementById('appFileInput').value=null;

    }

    uploadFilesToIpfs =async ()=>{
      console.log('uploading image buffer...',this.state.appLogoBuffer)
      const imageUploadResult = await fleekStorage.upload({
        apiKey: FLEEK_API_KEY,
        apiSecret: FLEEK_API_SECRET,
        key: `file-${new Date().getTime()}`,
        data: this.state.appLogoBuffer,
      });
      console.log('logoHash =',imageUploadResult)
      appLogoHash=imageUploadResult.hash;

      console.log('uploading app file buffer...',this.state.appFileBuffer)
      const appFileUploadResult = await fleekStorage.upload({
        apiKey: FLEEK_API_KEY,
        apiSecret: FLEEK_API_SECRET,
        key: `file-${new Date().getTime()}`,
        data: this.state.appFileBuffer,
      });
      console.log('appHash =',appFileUploadResult)
      appFileHash=appFileUploadResult.hashV0;

    }

    selectCategory = (event) => {
      this.setState({
        categoryInput : event.target.value
      })
    }
  }

  export default UploadApp;