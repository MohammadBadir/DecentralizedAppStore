// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

contract AppStore {

  mapping(uint => AppData) public apps;
  mapping(uint  => string) public appsFilesHashes;
  mapping(address  => UserData) public userDictionary;
  uint public appsCount = 0; 

  struct UserData {
    bool isInit;
    string userName;
    string downloadCode;
    uint[] uploadedApps;
    uint[] purchasedApps;
  }

  struct AppData {
    uint id;
    string appName;
    string category;
    string appDescription;
    string appDeveloper;
    address developerAddress;
    string appLogoHash;
    uint price;
    string priceCurrency;
    ReviewAndRating [] reviews;
  }

  struct ReviewAndRating{
    string name;
    address evaluaterAddress;
    uint rating;
    string review;
  }

  function createApp(string memory _appName,string memory _category,string memory _appDescription,uint _price,string memory _priceCurrency, string memory _appLogoHash,string memory _appFileHash) public payable {
    for (uint i = 0; i < userDictionary[msg.sender].uploadedApps.length; i++) {
      require(keccak256(bytes(apps[userDictionary[msg.sender].uploadedApps[i]].appName))!=keccak256(bytes(_appName)),'you already published an app with this name!');
    }
    appsCount++;
    apps[appsCount].id=appsCount;
    apps[appsCount].appName=_appName;
    apps[appsCount].category=_category;
    apps[appsCount].appDescription=_appDescription;
    apps[appsCount].appLogoHash=_appLogoHash;
    apps[appsCount].appDeveloper=userDictionary[msg.sender].userName;
    apps[appsCount].price=_price;
    apps[appsCount].priceCurrency=_priceCurrency;
    apps[appsCount].developerAddress=msg.sender;
    appsFilesHashes[appsCount]=_appFileHash;
    userDictionary[msg.sender].uploadedApps.push(appsCount);
  }


  function registerUser(string memory _userName, string memory initDownloadCode)public{
    require(bytes(_userName).length!=0,"username cannot be empty");
    require(bytes(userDictionary[msg.sender].userName).length==0,'this account is already registered!');
    userDictionary[msg.sender].userName=_userName;
    userDictionary[msg.sender].isInit=true;
    userDictionary[msg.sender].downloadCode=initDownloadCode;
  }


  function addReview(uint _appid,uint _rating,string memory _review,bool isAnonymous) public {
    require(msg.sender!=apps[_appid].developerAddress,'you cannot review your app!');
    for (uint i = 0; i < apps[_appid].reviews.length; i++) {
        require(apps[_appid].reviews[i].evaluaterAddress!=msg.sender,'you can review this app only once!');
    }
    bool appPurchased=false;
    for (uint i = 0; i < userDictionary[msg.sender].purchasedApps.length; i++) {
      if(userDictionary[msg.sender].purchasedApps[i]==_appid){
        appPurchased=true;
        break;
      }
    }
    require(appPurchased==true,'you cannot review an app you didnt purchase!');
    ReviewAndRating memory NewReview=ReviewAndRating(isAnonymous?'Anonymous':userDictionary[msg.sender].userName, msg.sender, _rating, _review);
    apps[_appid].reviews.push(NewReview);
  }


  function purchaseApp(uint _appid)public payable{
      uint conversionRate=1;
       if(keccak256(bytes("ETH"))==keccak256(bytes(apps[_appid].priceCurrency))){
         require(msg.value>=apps[_appid].price,"Not enough money!");
       }else{
         require((msg.value/conversionRate)+1>=apps[_appid].price,"Not enough money!");
       }
    for (uint i = 0; i < userDictionary[msg.sender].purchasedApps.length; i++) {
        if(userDictionary[msg.sender].purchasedApps[i]==_appid){
          return;
        }
    }
    for (uint i = 0; i < userDictionary[msg.sender].uploadedApps.length; i++) {
        if(userDictionary[msg.sender].uploadedApps[i]==_appid){
          return;
        }
    }
      userDictionary[msg.sender].purchasedApps.push(_appid);
     // apps[_appid].developerAddress.send(msg.value);
  }


  function getAppHash(uint _appid)public view returns(string memory){
    return appsFilesHashes[_appid];
  } 


  function isNewUser(address _user)public view returns(bool){
    return !userDictionary[_user].isInit;
  } 


  function getUserName(address _user)public view returns(string memory){
    return userDictionary[_user].userName;
  }


  function getUploadedApps(address _user) public view returns(uint[] memory){
    return userDictionary[_user].uploadedApps;
  }


  function getPurchasedApps(address _user) public view returns(uint[] memory){
    return userDictionary[_user].purchasedApps;
  }


  function getDownloadCode(address _user) public view returns(string memory){
    return userDictionary[_user].downloadCode;
  }


  function getReviews(uint appid) public view returns(ReviewAndRating [] memory ){
    return apps[appid].reviews;
  }

}
