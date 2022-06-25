const Contacts = artifacts.require("./AppStore.sol");

module.exports = function(deployer) {
  deployer.deploy(Contacts);
};