// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

contract AppStore {

  mapping(uint => AppData) public apps;
  mapping(address  => UserData) public userDictionary;
  uint public appsCount = 0; 

  struct UserData {
    bool isInit;
    string userName;
    string downloadCode;
    uint[] uploadedApps;
  }

  struct AppData {
    uint id;
    string appName;
    string category;
    string appDescription;
    string appDeveloper;
    address developerAddress;
    string appLogoHash;
    string appFileHash;
    uint price;
    ReviewAndRating [] reviews;
  }

  struct ReviewAndRating{
    string name;
    address evaluaterAddress;
    uint rating;
    string review;
  }

  function createApp(string memory _appName,string memory _category,string memory _appDescription,uint price,string memory _appLogoHash,string memory _appFileHash) public {
    for (uint i = 0; i < userDictionary[msg.sender].uploadedApps.length; i++) {
      require(keccak256(bytes(apps[userDictionary[msg.sender].uploadedApps[i]].appName))!=keccak256(bytes(_appName)),'you already published an app with this name!');
    }
    appsCount++;
    apps[appsCount].id=appsCount;
    apps[appsCount].appName=_appName;
    apps[appsCount].category=_category;
    apps[appsCount].appDescription=_appDescription;
    apps[appsCount].appLogoHash=_appLogoHash;
    apps[appsCount].appFileHash=_appFileHash;
    apps[appsCount].appDeveloper=userDictionary[msg.sender].userName;
    apps[appsCount].price=price;
    apps[appsCount].developerAddress=msg.sender;
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
    ReviewAndRating memory NewReview=ReviewAndRating(isAnonymous?'Anonymous':userDictionary[msg.sender].userName, msg.sender, _rating, _review);
    apps[_appid].reviews.push(NewReview);
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


  function getDownloadCode(address _user) public view returns(string memory){
    return userDictionary[_user].downloadCode;
  }


  function getReviews(uint appid) public view returns(ReviewAndRating [] memory ){
    return apps[appid].reviews;
  }


  function updateDownloadCode(string memory newCode) public {
    userDictionary[msg.sender].downloadCode = newCode;
  }

}
