pragma solidity ^0.8.14;

contract Appstore  {
    uint public taskCount = 0;
    enum categoryType{ GAME, GENERAL }

    struct AppData {
        uint developerID;
        uint appURL; //temporary, to be replaced with a string
        string appName;
        uint appSize;
        string appDescription;
        mapping(uint => uint) idToRating;
        categoryType category;
        
    }
}