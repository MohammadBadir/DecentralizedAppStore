// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract AppStore {
  uint public appsCount = 0; // state variable
  //enum appCategory{ Education, Entertainment, News, Sports, Music, Shopping, Business}
  struct ReviewAndRating{
    string name;
    uint rating;
    string review;
  }
  struct AppData {
    uint id;
    string appName;
    string category;
    string appDescription;
    string appDeveloper;
    uint price;
  //  ReviewAndRating [] reviews;
  }

  struct UserData {
    bool isInit;
    string userName;
  
    string downloadCode;
    uint[] uploadedApps;
  }
  
  constructor() public {
  }
  
  mapping(uint => AppData) public apps;
  mapping(address  => UserData) public userDictionary;

  function getUserName()public view returns(string memory){
    return userDictionary[msg.sender].userName;
  }

  function createApp(string memory _appName,string memory _category,string memory _appDescription,uint price) public {
    appsCount++;
    apps[appsCount] = AppData(appsCount, _appName, _category, _appDescription,userDictionary[msg.sender].userName ,price);
    userDictionary[msg.sender].uploadedApps.push(appsCount);
  }

  function registerUser(string memory userName, string memory initDownloadCode)public{
    require(bytes(userName).length!=0,"username cannot be empty");
    require(bytes(userDictionary[msg.sender].userName).length==0,"username is already set");
    userDictionary[msg.sender].userName=userName;
    userDictionary[msg.sender].downloadCode=initDownloadCode;
  }

  function getUploadedApps() public view returns(uint[] memory){
    return userDictionary[msg.sender].uploadedApps;
  }

  function getDownloadCode() public view returns(string memory){
    return userDictionary[msg.sender].downloadCode;
  }

  function updateDownloadCode(string memory newCode) public {
    userDictionary[msg.sender].downloadCode = newCode;
  }

}