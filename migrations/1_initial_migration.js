var Migrations = artifacts.require("./Migrations.sol");
//var FundingHub = artifacts.require("../contracts/FundingHub.sol");
//var Project = artifacts.require("../contracts/Project.sol");


module.exports = function(deployer) {
 // deployer.deploy(FundingHub,{gas:1000000});	
  deployer.deploy(Migrations);
};
