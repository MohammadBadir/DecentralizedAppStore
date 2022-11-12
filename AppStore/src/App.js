import React from 'react';
import Web3 from 'web3';
import './App.css'
import { APP_STORE_ABI, APP_STORE_ADDRESS } from './config';
import TopBar from './TopBar.js';
import AppsView from './AppsView.js';
import AppPage from './AppPage';
import MyApps from './MyApps.js';
import DownloadedApps from './DownloadedApps.js';
import UploadApp from './UploadApp.js';
import FirstTimeScreen from './firstTimeScreen'
import { encrypt } from '@metamask/eth-sig-util';
import { ThirtyFpsRounded } from '@mui/icons-material';
const ascii85 = require('ascii85');


class App extends React.Component {

  constructor(props){
    super(props);
    this.CURRENCY_CONVERTOR_KEY='C5c8c6976bedc076f555cf3536f25b1910588873e056fb2691cd296ff910d147f';
    this.categories=["Education", "Entertainment", "News", "Sports", "Music", "Shopping", "Business"];
    this.state={
      currentView: 0, // apps=0,myapps=1,downloaded=2,uploadapp=3...
      appPageView:0, // the number indicates the app page to be displayed
      account : "",
      userName :'',
      appStoreContract : [],
      apps :[],
      downloadedApps:[],
      uploadedApps:[],
      appsCount : 0,
      isFirstTime : true,
      publicKey: "",
      review:[],
      ethToUSDConverstionRate: null, 
    };

  }

  render(){
     if(this.state.isFirstTime){
      return ( 
        <div>
            <FirstTimeScreen updateUserName={this.updateUserName} toggleFirstTime={this.toggleFirstTime}/>
        </div>
      )
    }else if(this.state.appPageView!=0){
      return (
        <div>
             <TopBar account={this.state.account} userName={this.state.userName} changeView={this.changeView}/>
             <AppPage isPurchased={this.state.downloadedApps.map((app)=>app.id).includes(this.state.appPageView)} addReview={this.addReview} conversionRate={this.state.ethToUSDConverstionRate} downloadApp={this.downloadApp} app={this.state.apps[this.state.appPageView-1]} backToApps={this.backToApps}/>
        </div>
       );
    }else if(this.state.currentView==0){
       return (
        <div>
             <TopBar account={this.state.account} userName={this.state.userName} changeView={this.changeView}/>
             <AppsView  openAppPage={this.openAppPage}  apps={this.state.apps} categories={this.categories}/>
        </div>
       );
    }else if(this.state.currentView==1){
      return (
        <div>
             <TopBar account={this.state.account} userName={this.state.userName} changeView={this.changeView}/>
             <MyApps openAppPage={this.openAppPage} uploadedApps={this.state.uploadedApps} categories={this.categories}/>
        </div>
       );
    }else if(this.state.currentView==2){
      return (
        <div>
             <TopBar account={this.state.account} userName={this.state.userName}  changeView={this.changeView}/>
             <DownloadedApps openAppPage={this.openAppPage} downloadedApps={this.state.downloadedApps} categories={this.categories}/>
        </div>
       );
    }else if(this.state.currentView==3){
      return (
        <div>
             <TopBar account={this.state.account} userName={this.state.userName} changeView={this.changeView}/>
             <UploadApp categories={this.categories} addNewApp={this.addNewApp} uploadedApps={this.state.uploadedApps} conversionRate={this.state.ethToUSDConverstionRate}/>
        </div>
       );
    }
  }

  componentDidMount(){
    const load = async ()=>{
     const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
     const accounts = await web3.eth.requestAccounts();
     const contract = new web3.eth.Contract(APP_STORE_ABI, APP_STORE_ADDRESS);
     window.ethereum.on('accountsChanged', function (newAccount) { // when switching metamask accounts => reload the page
       window.location.reload();
     }) 
     web3.eth.handleRevert=true;
     this.setState({
       account :accounts[0],
       appStoreContract : contract,
     })
     let firstTime=await contract.methods.isNewUser(accounts[0]).call();
     console.log('account',accounts[0])
     this.setState({
       isFirstTime :firstTime
     });

     let userNameTemp=await contract.methods.getUserName(accounts[0]).call();
     this.setState({
       userName : userNameTemp
     })
     console.log('username',userNameTemp)

     const counter = await contract.methods.appsCount().call();

     let appsTemp=[];
     for (var i = 1; i <= counter; i++) {
       const app = await contract.methods.apps(i).call();
       const reviews = await contract.methods.getReviews(app.id).call();
       app.reviews=reviews;
       appsTemp=[...appsTemp,app]
     }
     this.setState({
       apps : [...appsTemp],
       appsCount : parseInt(counter),
     });

     if(firstTime==true){
       return;
     }

     this.initDownloadList(contract);

     // //this.downloadCode = "hi";
     // let dCode = await contract.methods.getDownloadCode().call();
     // //console.log("hey" + dCode);
     // //console.log(this.state.downloadCode+"A");
     // this.setState({
     //   downloadCode: dCode
     // });
     // console.log(this.state.downloadCode+"AA");
     //console.log(this.downloadCode + "A");
     // let mydownloadedApps = await contract.methods.getDownloadedApps().call();
     // let downloadedAppsTemp=[];
     // let iterator=0;
     // while(mydownloadedApps[iterator]!=undefined){
     //   const app = await contract.methods.apps(mydownloadedApps[iterator]).call();
     //   downloadedAppsTemp=[...downloadedAppsTemp,app]
     //   iterator++;
     // }
     // this.setState({
     //   downloadedApps : [...downloadedAppsTemp]
     // });

     let myUploadedApps = await contract.methods.getUploadedApps(accounts[0]).call();
     let uploadedAppsTemp=[];
     let iter=0;
     while(myUploadedApps[iter]!=undefined){
  //     const app = await contract.methods.apps(myUploadedApps[iter]).call();
  //     const reviews = await contract.methods.getReviews(app.id).call();
 //      app.reviews=reviews;
       let app= this.state.apps[myUploadedApps[iter]-1];
       uploadedAppsTemp=[...uploadedAppsTemp,app]
       iter++;
     }
     this.setState({
       uploadedApps : [...uploadedAppsTemp]
     });
     fetch(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH&tsyms=USD&api_key=${this.CURRENCY_CONVERTOR_KEY}`)
     .then((response) => response.json()).then(data=>{
      console.log('converted ETH to USD',data.ETH.USD)
      this.setState({
        ethToUSDConverstionRate : data.ETH.USD
      })
     })
     }
   load();
 }

 backToApps = () => { 
   this.setState({
     appPageView : 0
   })  
 }

 openAppPage =(appid) => {
   this.setState({
     appPageView : appid
   })
 }

  addNewApp = async (appName,appCategory,AppDescription,appPrice,priceCurrency,appLogoHash,appFileHash)=>{
    try{
      await this.state.appStoreContract.methods.createApp(appName,appCategory,AppDescription,appPrice,priceCurrency,appLogoHash,appFileHash).send({from : this.state.account});
      const newApp=await this.state.appStoreContract.methods.apps(this.state.appsCount+1).call();
      const reviews = await this.state.appStoreContract.methods.getReviews(newApp.id).call();
      newApp.reviews=reviews;
      this.setState(oldState => ({
        apps : [...oldState.apps,newApp],
        appsCount : oldState.appsCount+1,
        uploadedApps : [...oldState.uploadedApps,newApp]
      }))
      alert('app has been uploaded successfully')
    }catch(err){
      const appWithSameNameExist='you already published an app with this name!';
      if(err.message.includes(appWithSameNameExist)){
        alert(appWithSameNameExist);
      }else if(err.message.includes('User denied transaction')){
      }else{
        console.log(err)
        alert('an error occured')
      }
    }
  }

   getRPCErrorMessage=(err)=>{
    // var open = err.stack.indexOf('{')
    // var close = err.stack.lastIndexOf('}')
    // var j_s = err.stack.substring(open, close + 1);
    // var j = JSON.parse(j_s);
    // var reason = j.data[Object.keys(j.data)[0]].reason;
    // return reason;

    const data = err.data;
    const txHash = Object.keys(data)[0]; // TODO improve
    const reason = data[txHash].reason;
    console.log("reason2",reason)
    return reason;
}

addReview = async (appid, rating, review, _isAnonymous)=>{
  try {
    await this.state.appStoreContract.methods.addReview(appid,rating,review,_isAnonymous).send({from : this.state.account});
    const _apps=this.state.apps;
    _apps[appid-1].reviews=[... _apps[appid-1].reviews,{name:_isAnonymous?'Anonymous':this.state.userName,rating:rating,review:review}];
    this.setState({
      apps : _apps
    })
  }
  catch(err) {
    const canReviewOnce='you can review this app only once!';
    const cannotReviewSelf='you cannot review your app!';
    if(err.message.includes(canReviewOnce)){
      alert(canReviewOnce);
    }else if(err.message.includes(cannotReviewSelf)){
      alert(cannotReviewSelf);
    }else if(err.message.includes('User denied transaction')){
    }else{
      alert('an error occured')
    }
 // console.log("reason",err.message)
  //alert(this.getRPCErrorMessage(err));
    return;
  }
}

  changeView=(event)=>{

    const newViewIndex=event.target.dataset.index;
    this.setState({
      currentView : newViewIndex,
      appPageView : 0 
    })
    var elements = document.getElementsByClassName('topButtons'); 
    for(var i = 0; i < elements.length; i++){
      elements[i].style.color = "white";
      elements[i].style.backgroundColor = 'rgb(111,109,227)';
    }
    event.target.style.color='rgb(40,44,52)'
    event.target.style.backgroundColor='rgb(243,244,246)'
  }

  downloadApp = async (appId) =>{

    if(this.state.downloadedApps.map((app)=>app.id).includes(appId)){ // to avoid duplicates 
      return;
   }


    let newStr = await this.getUpdatedDownloadCode(appId);

    await this.state.appStoreContract.methods.updateDownloadCode(newStr).send({from : this.state.account});
    let newApp= this.state.apps[appId-1]; 
    let updatedList = [...this.state.downloadedApps, newApp];
    this.setState(oldState=>({
        downloadedApps : updatedList
     }));

    // const app = await this.state.appStoreContract.methods.apps(appId).call();
    // console.log("PRE: " + this.state.downloadCode);
    // let val = this.state.downloadCode + "$" + appId.toString();
    // await this.state.appStoreContract.methods.downloadApp(appId, val).send({from : this.state.account});
    // const app = await this.state.appStoreContract.methods.apps(appId).call();
    // this.setState(oldState=>({
    //   downloadCode : val,
    //   downloadedApps : [...oldState.downloadedApps,app]
    // }));
  }

  updateUserName =async (_userName) => {
    this.setState({
      userName : _userName
    })
    let encryptedString = await this.generateInitialEncrypedString();
    await this.state.appStoreContract.methods.registerUser(_userName, encryptedString).send({from : this.state.account})
    
  }

  toggleFirstTime = ()=>{
    this.setState({
      isFirstTime : false
    })
  }


  intToChar() {
    let someInt = Math.floor(Math.random() * 71) + 58;
    return String.fromCharCode(someInt);
  }

  encryptData(publicKey, data) {
    // Returned object contains 4 properties: version, ephemPublicKey, nonce, ciphertext
    // Each contains data encoded using base64, version is always the same string
    const enc = encrypt({
      publicKey: publicKey.toString('base64'),
      data: ascii85.encode(data).toString(),
      version: 'x25519-xsalsa20-poly1305',
    });
  
    // We want to store the data in smart contract, therefore we concatenate them
    // into single Buffer
    const buf = Buffer.concat([
      Buffer.from(enc.ephemPublicKey, 'base64'),
      Buffer.from(enc.nonce, 'base64'),
      Buffer.from(enc.ciphertext, 'base64'),
    ]);
    
    // In smart contract we are using `bytes[112]` variable (fixed size byte array)
    // you might need to use `bytes` type for dynamic sized array
    // We are also using ethers.js which requires type `number[]` when passing data
    // for argument of type `bytes` to the smart contract function
    // Next line just converts the buffer to `number[]` required by contract function
    // THIS LINE IS USED IN OUR ORIGINAL CODE:
    // return buf.toJSON().data;
    
    // Return just the Buffer to make the function directly compatible with decryptData function
    return buf;
  }

  async decryptData(account, data) {
    // Reconstructing the original object outputed by encryption
    const structuredData = {
      version: 'x25519-xsalsa20-poly1305',
      ephemPublicKey: data.slice(0, 32).toString('base64'),
      nonce: data.slice(32, 56).toString('base64'),
      ciphertext: data.slice(56).toString('base64'),
    };
    // Convert data to hex string required by MetaMask
    const ct = `0x${Buffer.from(JSON.stringify(structuredData), 'utf8').toString('hex')}`;
    // Send request to MetaMask to decrypt the ciphertext
    // Once again application must have acces to the account
    const decrypt = await window.ethereum.request({
      method: 'eth_decrypt',
      params: [ct, account],
    });
    // Decode the base85 to final bytes
    return ascii85.decode(decrypt);
  }

  serialize(downloadAppList){
    // 🤓
    const count = downloadAppList.length;
    let userApps = "";
    console.log("Num of apps: " + count);
    for (var i = 0; i < count; i++) {
      userApps = userApps.concat(downloadAppList[i].id.toString(), this.intToChar());
    }
    userApps = userApps.concat(this.intToChar(), this.intToChar(), this.intToChar(), this.intToChar(), this.intToChar());
    console.log("Serialized array before encryption: " + userApps);
    //encrypt
    return userApps;
  }

  async deserialize(decryptedString){
    //decrypt
    let stuff = decryptedString
    let start=0;
    let end=0;
    let things = []
    while(stuff.charCodeAt(start)<='9'.charCodeAt(0) && stuff.charCodeAt(start)>='0'.charCodeAt(0)){
      if(stuff.charCodeAt(end)<='9'.charCodeAt(0) && stuff.charCodeAt(end)>='0'.charCodeAt(0)){
        end++;
        continue;
      }
      let temp = parseInt(stuff.substring(start, end));
   //   let temp2 = await this.state.appStoreContract.methods.apps(temp).call();
      let temp2= this.state.apps[temp-1];
      things.push(temp2);
      start = end + 1
      end = end + 1
    }

    for(var j=0; j<things.length; j++){
      console.log("apps[" + j.toString() + "]: " + things[j].toString());
    }

    return things;
  }

  async initDownloadList(contract){
    console.log('** Fetching Downloaded App List **');

    //Load download code string from blockchain and convert to buffer
    let dCodeStr = await contract.methods.getDownloadCode(this.state.account).call();
    let dCodeBuffer = Buffer.from(JSON.parse(dCodeStr).data);

    console.log("Encrypted String: " + dCodeStr)

    //Decrypt download code and convert to string
    let decryptedBuffer = await this.decryptData(this.state.account, dCodeBuffer);
    let decryptedString = decryptedBuffer.toString();

    console.log("Decrypted string: " + decryptedString);

    //Build downloadedApps array
    let appArr = await this.deserialize(decryptedString);
  //  const reviews = await contract.methods.getReviews(appArr.id).call();
   // appArr.reviews=reviews;

    this.setState({
      downloadedApps : appArr
    });

    console.log('** End **');
  }

  async getUpdatedDownloadCode(appId){
    console.log("--Generating new download code after adding app with Id: " + appId + "--");


    //Add app to downloadedAppsArray
//    const newApp = await this.state.appStoreContract.methods.apps(appId).call();


    let newApp= this.state.apps[appId-1]; 
    let updatedList = [...this.state.downloadedApps, newApp];
  //  this.setState(oldState=>({
    //   downloadedApps : updatedList
  //  }));


    //Serialize
    let serialized = this.serialize(updatedList);
    let buffer = Buffer.from(serialized, "utf-8");

    //Fetch public key, request it if it's not in state
    let pubKey = this.state.publicKey;
    if(pubKey==''){
      // Key is returned as base64
      const keyB64 = await window.ethereum.request({
        method: 'eth_getEncryptionPublicKey',
        params: [this.state.account],
      });
      console.log('key64',keyB64)
      pubKey = Buffer.from(keyB64, 'base64')
      this.setState({
        publicKey : pubKey
      });
    }
    console.log("Public Key: " + pubKey);

    //Encrypt
    let encryptedBuffer = this.encryptData(pubKey, buffer);
    let encryptedString = JSON.stringify(encryptedBuffer);
    
    console.log("Generated encryptedString: " + encryptedString);
    console.log("--End--");

    return encryptedString;
  }

  generateInitialEncrypedString = async () =>{
    console.log("Generating initial encrypted string");

    //Serialize
    let serialized = this.serialize([]);
    let buffer = Buffer.from(serialized, "utf-8");

    //Fetch public key, request it if it's not in state
    let pubKey = this.state.publicKey;
    if(pubKey==''){
      // Key is returned as base64
      const keyB64 = await window.ethereum.request({
        method: 'eth_getEncryptionPublicKey',
        params: [this.state.account],
      });

      pubKey = Buffer.from(keyB64, 'base64')
      this.setState({
        publicKey : pubKey
      });
    }
    console.log("Public Key: " + pubKey);

    //Encrypt
    let encryptedBuffer = this.encryptData(pubKey, buffer);
    let encryptedString = JSON.stringify(encryptedBuffer);

    return encryptedString;
  }
}

export default App;