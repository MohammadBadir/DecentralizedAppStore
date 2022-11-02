import React from 'react';
import Web3 from 'web3';
//import {ipfs} from './IPFS.js';
//import {ipfs} from './IPFS';
//import {create} from 'ipfs-http-client';
//import { create } from 'ipfs-http-client'

import fleekStorage from '@fleekhq/fleek-storage-js'
const FLEEK_API_KEY='EvylP8PA/dw/vRh5P7ntRQ==';
const FLEEK_API_SECRET='4nZd2m+n3HB9U+iKP8629yetFoipqZKjjrVW4/L3VaM=';

// //from here

// const ipfsClient = require("ipfs-http-client");

// const PROJECT_ID='7XZ3XYuZYoVy2d26h9CA1Q==';
// const PROJECT_SECRET='k5gQeLlI2FakZmZ1ycDAyQ==';

// const auth = 'Basic ' + Buffer.from(PROJECT_ID + ':' + PROJECT_SECRET).toString('base64');


//   const ipfs = ipfsClient({
//     host: 'ipfs.fleek.co',
//     port: 5001,
//     protocol: 'https',
//     headers: {
//       authorization:  auth
//     }
//   })
// //till here

//const ipfsClient = require('ipfs-http-client');
//var ipfs = ipfsClient({ host: 'ipfs.infura.io', port: '5001', protocol: 'http' })

let appLogoHash='';

class UploadApp extends React.Component{
  constructor(props){
    super(props);
    this.state={
      appNameInput : "",
      categoryInput : "Education",
      appDescriptionInput : "",
      appNameEmpty : false,
      appPriceInput: '0',
      buffer: null,
    //  appLogoHash : ''
    };
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
  // document.getElementById("submitAppBtn").disabled = true;
   await this.uploadImage()
    await this.props.addNewApp(this.state.appNameInput,this.state.categoryInput,this.state.appDescriptionInput,this.state.appPriceInput,appLogoHash)
    this.setState({
      appNameInput : "",
      appDescriptionInput : "",
      appPriceInput : '0'
    }); 
    document.getElementById('appLogoInput').value= null;
    alert('app has been uploaded successfully')
  //  document.getElementById("submitAppBtn").disabled = false;
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
                <input onChange={this.inputChangeHandle} value={this.state.appPriceInput} name='appPriceInput' id='appPriceInput' type="number" style={{height : '25px',width:'50px'}}></input>
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
                <input type="file" onChange={this.inputLogoChangeHandle} id='appLogoInput'/>
            {/*    <button onClick={this.uploadImage}>uploadimage</button> */}
              </label>
              {/*    <img src={this.state.appLogoHash==''?'':`https://ipfs.fleek.co/ipfs/${this.state.appLogoHash}`} alt=""/><br/> */}
               <input  id="submitAppBtn" className="submitButtons" type="submit" value="Submit" />
            </form>
        </div>
         );
    }

    inputChangeHandle =(event) => {
      this.setState({
        [event.target.name] : event.target.value
      });
    }

    inputLogoChangeHandle = (event) => {
      event.preventDefault()
      const file = event.target.files[0]
      if(file=='' || file== undefined || file==null) return
      const reader = new window.FileReader()
      reader.readAsArrayBuffer(file)
      reader.onloadend = () => {
        this.setState({ buffer: Buffer(reader.result) })
      }
    }

    uploadImage =async ()=>{
      console.log('buffer from upload image',this.state.buffer)
      const uploadResult = await fleekStorage.upload({
        apiKey: FLEEK_API_KEY,
        apiSecret: FLEEK_API_SECRET,
        key: `file-${new Date().getTime()}`,
        data: this.state.buffer,
      });
      console.log('hash =',uploadResult)
      appLogoHash=uploadResult.hash;
    //  this.setState({appLogoHash : uploadResult.hash})
  //     await ipfs.add(this.state.buffer, (error, result) => {
  //       if(error) {
  //         console.error(error)
  //         return
  //       }
  //    //   this.simpleStorageInstance.set(result[0].hash, { from: this.state.account }).then((r) => {
  //         return this.setState({ appLogoHash: result[0].hash })
  //         console.log('ifpsHash', this.state.appLogoHash)
  // //      })
  //     })
    }

    selectCategory = (event) => {
      this.setState({
        categoryInput : event.target.value
      })
    }
  }

  export default UploadApp;