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
  
  constructor() public {
    createApp('candy crush', "Entertainment", "good game", 'waseem');
  }
  
  mapping(uint => AppData) public apps;
  mapping(address  => uint[]) public downloadedApps;

  function createApp(string memory _appName,string memory _category,string memory _appDescription, string memory _developerName) public {
    appsCount++;
    apps[appsCount] = AppData(appsCount, _appName, _category, _appDescription, _developerName);
  }

    function downloadApp(address  _address,uint appId) public{
    downloadedApps[_address].push(appId);
  }

  function getDownloadedApps(address  _address) public returns(uint[] memory){
    return downloadedApps[_address];
  }

}