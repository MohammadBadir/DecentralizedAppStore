// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract AppStore {
  uint public appsCount = 0; // state variable
  //enum appCategory{ Education, Entertainment, News, Sports, Music, Shopping, Business}
  struct AppData {
    uint id;
    string appName;
    string category;
    string appDescription;
    string appDeveloper;
  }

  struct UserData {
    bool isInit;
    string userName;
    
    string downloadCode;
    uint[] downloadedApps;
    uint[] uploadedApps;
  }
  
  constructor() public {
  }
  
  mapping(uint => AppData) public apps;
  mapping(address  => UserData) public userDictionary;

  function createApp(address  _address,string memory _appName,string memory _category,string memory _appDescription, string memory _developerName) public {
    appsCount++;
    apps[appsCount] = AppData(appsCount, _appName, _category, _appDescription, _developerName);
    userDictionary[_address].uploadedApps.push(appsCount);
  }

  function downloadApp(address  _address,uint appId, string memory newCode) public{
    userDictionary[_address].downloadedApps.push(appId);
    userDictionary[_address].downloadCode = newCode;
  }

  function getDownloadedApps(address  _address) public view returns(uint[] memory){
    return userDictionary[_address].downloadedApps;
  }

  function getUploadedApps(address  _address) public view returns(uint[] memory){
    return userDictionary[_address].uploadedApps;
  }

  function getDownloadCode(address  _address) public view returns(string memory){
    return userDictionary[_address].downloadCode;
  }

  function updateDownloadCode(address _address, string memory newCode) public {
    userDictionary[_address].downloadCode = newCode;
  }

}