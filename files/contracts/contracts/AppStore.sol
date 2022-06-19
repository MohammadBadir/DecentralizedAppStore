// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract AppStore {
  uint public appsCount = 0; // state variable
  
  struct AppData {
    uint id;
    string appName;
    string appDeveloper;
  }
  
  constructor() public {
    createApp('candy crush', 'waseem');
  }
  
  mapping(uint => AppData) public apps;
  
  function createApp(string memory _appName, string memory _developerName) public {
    appsCount++;
    apps[appsCount] = AppData(appsCount, _appName, _developerName);
  }
}