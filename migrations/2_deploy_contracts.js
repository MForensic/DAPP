
var FundingHub = artifacts.require("./FundingHub");
//var Project = artifacts.require("../contracts/Project.sol");
//var FundingHub1 = artifacts.require("../test/FundingHub.sol");
//var Project1 = artifacts.require("../test/Project.sol");





module.exports = (deployer, network, accounts) => {
  const superuser = accounts[0];
  console.log('Deploying to network', network, 'from', superuser);

  deployer.deploy(FundingHub, { from: superuser }).then(() => {
    console.log('Deployed Cocktail with address', FundingHub.address);
  });
};

/*module.exports = function(deployer) {
  deployer.deploy(FundingHub,{gas:1000000});*/	


  //deployer.deploy(FundingHub1);	
  // .then(result =>{
  // 	FundingHub.deployed().then(FundingHub =>{
  // 	//	return FundingHub.CreateP(web3.eth.accounts[1], 100000000000000000, 2883228800)
  // 	} )
  // })
  // deployer.link(FundingHub,Project);

  // deployer.deploy(Project);


