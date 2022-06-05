const Appstore = artifacts.require("./Appstore.sol");

module.exports = function (deployer) {
  deployer.deploy(Appstore);
};
