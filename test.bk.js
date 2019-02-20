// const Web3 = require('web3');
// const web3 = new Web3();

// // const TestRPC = require('ethereumjs-testrpc');
// // web3.setProvider(TestRPC.provider());
// // const Promise = require('bluebird');



// // function sequentialPromise(promiseArray) {
// //     const result = promiseArray.reduce(
// //         (reduced, promise, index) => {
// //             reduced.results.push(undefined);
// //             return {
// //                 chain: reduced.chain
// //                     .then(() => promise)
// //                     .then(result => reduced.results[ index ] = result),
// //                 results: reduced.results
// //             };
// //         },
// //         {
// //             chain: Promise.resolve(),
// //             results: []
// //         });
// //     return result.chain.then(() => result.results);
// // }
// // sequentialPromise([
// //     Promise.resolve(web3.eth), Promise.resolve({ suffix: "Promise" })
// // ]).then(console.log);
// // web3.eth.getAccountsPromise = function () {
// //     return new Promise(function (resolve, reject) {
// //         web3.eth.getAccounts(function (e, accounts) {
// //             if (e != null) {
// //                 reject(e);
// //             } else {
// //                 resolve(accounts);
// //             }
// //         });
// //     });
// // };





// // const assert = require('assert-plus');
// // const truffleContract = require("truffle-contract");
// // const FundingHub = truffleContract(require("../build/contracts/FundingHub.json"));
// // //FundingHub.setProvider(web3.currentProvider);
// // //const FundingHub = truffleContract(FundingHubjson);
 
// // FundingHub.setProvider(web3.currentProvider);
// // FundingHub.defaults({
// //     from:web3.eth.accounts[0]
// // }
// // )
// // FundingHub.deployed().then(instance=>

// //     {
// //         fhub = instance;

// //     });

// // describe("FundingHub", function() {
// //     var accounts, networkId, fundinghub;

// //     before("get accounts", function() {
// //         return web3.eth.getAccountsPromise()
// //             .then(_accounts => accounts = _accounts)
// //             .then(() => web3.version.getNetworkPromise())
// //             .then(_networkId => {
// //                 networkId = _networkId;
// //                 FundingHub.setNetwork(networkId);
// //                 print("The network id is "+networkId);
// //             });
// //     });

// //         beforeEach("deploy a FundingHub", function() {
// //         return FundingHub.new({ from: accounts[1] })
// //             .then(_fundinghub => fundinghub = _fundinghub);
// //     });

// //  });

// //     it("Should refund all the received amounts to their repsective donors", function() {

// //     return FundingHub.deployed().then(_fundinghub=>{
// //     	print(_fundinghub)
// //     })

// //     });

// //const Promise = require("bluebird");
// const truffleContract = require("truffle-contract");
// const $ = require("jquery");
// // Not to forget our built contract
// const FundingHubjson = require("../../build/contracts/FundingHub.json");
// //require("file-loader?name=../app/index.html!../index.html");


// // Supports Mist, and other wallets that provide 'web3'.
// // if (typeof web3 !== 'undefined') {
// //     // Use the Mist/wallet/Metamask provider.
// //     window.web3 = new Web3(web3.currentProvider);
// // } else {
// //     // Your preferred fallback.
// //     window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545')); 
// // }



//   web3.eth.getTransactionReceiptMined = require("../app/js/utils.js");

// function sequentialPromise(promiseArray) {
//     const result = promiseArray.reduce(
//         (reduced, promise, index) => {
//             reduced.results.push(undefined);
//             return {
//                 chain: reduced.chain
//                     .then(() => promise)
//                     .then(result => reduced.results[ index ] = result),
//                 results: reduced.results
//             };
//         },
//         {
//             chain: Promise.resolve(),
//             results: []
//         });
//     return result.chain.then(() => result.results);
// }
// sequentialPromise([
//     Promise.resolve(web3.eth), Promise.resolve({ suffix: "Promise" })
// ]).then(console.log);
// web3.eth.getAccountsPromise = function () {
//     return new Promise(function (resolve, reject) {
//         web3.eth.getAccounts(function (e, accounts) {
//             if (e != null) {
//                 reject(e);
//             } else {
//                 resolve(accounts);
//             }
//         });
//     });
// };





// const FundingHub = truffleContract(FundingHubjson);
 
// FundingHub.setProvider(web3.currentProvider);
// FundingHub.defaults({
//     from:web3.eth.accounts[0]
// }
// )
// FundingHub.deployed().then(instance=>

//     {
//         fhub = instance;

//     });



const FundingHub = artifacts.require("./FundingHub.sol");

contract('FundingHub', accounts => {
    var amount = 10000000000000000 ;

  //console.log(accounts);
  // Will show ["0x1c25cc6a9f326ac277ce6879b03c4fd0596e10eb", "0x991b2246c8ed92a63ae64c9b910902f55350cd13", "0x258a69adcfb68ad70182bb351c7fa0b0e4b4b4cd"]

  // Your unit tests come here

  it("Should refund all the received amounts to their repsective donors", function() {

    return FundingHub.deployed().then(instance=>{
        instance.CreateP("testP", accounts[0], 10, 600000000000000, {from: accounts[0], gas: 3000000}).then(tx=>{

            instance.latestProject().then(projectAddress=>{
                instance.getProjectInfo.call(projectAddress, {from: accounts[0]}).then(Initial_PArray=>{
                    initial_amount = Initial_PArray[3];
                   // .then(initial_amount=>{
                    initial_amount=Number(initial_amount);
                    console.log("Initial amount"+initial_amount);

                    account1 = web3.eth.getBalance(accounts[1]);
                console.log("project projectAddress"+projectAddress);

              // .then(account1=>{
                    acc1_initial_balance = account1.toNumber();
                      instance.contribute(projectAddress,{from : accounts[1], value : amount, gas: 4712388, gasPrice : 0}).then(tx=>{
                    console("project Address"+projectAddress);

                   return instance.getProjectInfo.call(projectAddress, {from: accounts[0]});






                    }).then(PArray=>{
                            balance = web3.eth.getBalance(accounts[1]);
                            acc1_current_balance = balance.toNumber();
                            amount_Raised = PArray[3];
                            AR=Number(amount_Raised);
                            assert.isAtLeast(acc1_initial_balance-acc1_current_balance,amount,"test 1: Amount wasn't correctly taken from the sender");
                            console.log("Raised amount"+AR);
                            console.log("amount"+amount);
                            assert.equal(AR,(initial_amount+amount),"test 1: Funded amount has not been traffered correctly");


                        })

               // })
                



                })
              //  })




              
                })
            })
        })
    })

    });


//});