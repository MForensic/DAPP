

const Promise = require("bluebird");
const truffleContract = require("truffle-contract");
const $ = require("jquery");
// Not to forget our built contract
const FundingHubjson = require("../../build/contracts/FundingHub.json");
require("file-loader?name=../index.html!../index.html");


// Supports Mist, and other wallets that provide 'web3'.
if (typeof web3 !== 'undefined') {
    // Use the Mist/wallet/Metamask provider.
    window.web3 = new Web3(web3.currentProvider);
} else {
    // Your preferred fallback.
    window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545')); 
}

  web3.eth.getTransactionReceiptMined = require("./utils.js");

function sequentialPromise(promiseArray) {
    const result = promiseArray.reduce(
        (reduced, promise, index) => {
            reduced.results.push(undefined);
            return {
                chain: reduced.chain
                    .then(() => promise)
                    .then(result => reduced.results[ index ] = result),
                results: reduced.results
            };
        },
        {
            chain: Promise.resolve(),
            results: []
        });
    return result.chain.then(() => result.results);
}
sequentialPromise([
    Promise.resolve(web3.eth), Promise.resolve({ suffix: "Promise" })
]).then(console.log);
web3.eth.getAccountsPromise = function () {
    return new Promise(function (resolve, reject) {
        web3.eth.getAccounts(function (e, accounts) {
            if (e != null) {
                reject(e);
            } else {
                resolve(accounts);
            }
        });
    });
};





const FundingHub = truffleContract(FundingHubjson);
 
FundingHub.setProvider(web3.currentProvider);
FundingHub.defaults({
    from:web3.eth.accounts[0]
}
)
FundingHub.deployed().then(instance=>

    {
        fhub = instance;

    });
    
    




window.addEventListener('load', function() {

    $("#addProject").click(addProject);
  
    document.addEventListener("click", function(e) {
        var buttonid=btnid();
         
         var inputid=document.getElementById(buttonid);
         if(inputid.nodeName=="BUTTON"){
          console.log(inputid.nodeName);

         var RA= inputid.parentElement.parentElement.children[1].innerText;
         var Am=inputid.parentElement.parentElement.children[7].children[0].value ;
         if(Am.trim() == ''){
            alert("Please write the amount");


         }
         else{
                    contrib(RA,Am);

         }


         }
         



    });




    return web3.eth.getAccountsPromise()

        .then(accounts => {

            if (accounts.length == 0) {

                $("#status").html("N/A");

                throw new Error("No account with which to transact");

            }

            window.account = accounts[0];
      
           return fhub;
        })

       .then(deployed => {
        
          console.log(deployed);

            fundinghub = deployed;

        })

         .then(count => {
                createTable();
       

         })    

        .catch(console.error);

 });


var newName ="";
var newOwner = "";  
var newAmount = "";
var deadline = "";
//var Status = ""
const addProject = function() {
            newName = document.getElementById("name").value;
            newOwner= document.getElementById("owner").value;
            newAmount= document.getElementById("amount").value;
            deadline = document.getElementById("deadline").value;
        //console.log(newName, newOwner, newAmount,Status, deadline);
        fundinghub.CreateP(newName, newOwner, newAmount, deadline, {from: newOwner, gas: 3000000}).then(tx => {

            return web3.eth.getTransactionReceiptMined(tx.tx);
                    }).then(receipt=> {

                    createTable();
                  
                    })

                
    }


const createTable = function (){
    var ProjectArray = new Array();
    ProjectArray.push(["Project name","Project Address","amount required","amount raised","Deadline", "Status", "Click2Fund", "funding amount", "Project Owner"]);
    var table = document.createElement("TABLE");
    table.border = "1";
    var columncount = ProjectArray[0].length;
    var row = table.insertRow(-1);
    for (var i=0; i< columncount;i++){
        var headerCell = document.createElement("TH");
        headerCell.innerHTML = ProjectArray[0][i];
        row.appendChild(headerCell);

    }
    fundinghub.getProjects.call({from: window.account}).then(pAddArr =>{
        console.log("address lenght"+pAddArr.length);
        row = table.insertRow(-1);
        var k=0;

        for (var j=0;j<pAddArr.length ;j++){

            fundinghub.getProjectInfo.call(pAddArr[j],{from: window.account}).then((name) =>{
                console.log("name length is"+name.length);
                name[0] = web3.toAscii(name[0]);    

                for (var i=0;i<=name.length+1;i++){
                    var cell = row.insertCell(-1);

                    if (i==name.length-1){
                           // name[4]=0;
                        if(name[5]==0){
                            k =k+1;

                            var btn=document.createElement("BUTTON");
                            btn.id='fundP'+k;
                            btn.style.width="50px";
                            btn.style.height="30px";
                            btn.style.align="center";

                            btn.innerHTML ="Fund";
                           
                            cell.appendChild(btn);


                        }
                        else{
                            cell.innerHTML="Can't fund";

                        }



                    }


                  else if(i==name.length){

                            var mi = document.createElement("input");
                            mi.id='amount'+k
                           
                            mi.setAttribute('type', 'text');


                            cell.appendChild(mi);


                         }

                  else {
                    if(i==name.length+1){
                      cell.innerHTML = name[6];
                       }
                  else {
                         cell.innerHTML = name[i];
                        console.log("i is"+name[6]);
                        console.log("else needed"+name[i]);
                       }

                       






                    }   


           //     cell.innerHTML=name[i];

               }

             //var cell = row.insertCell(-1);
             //cell.innerHTML = name[i];


             row = table.insertRow(-1);


               



             })


        
        }


    })


   

    var dvTable = document.getElementById("dvTable");
    dvTable.innerHTML = "";
    dvTable.appendChild(table); 



}

const fundP = function(){
   x = document.getElementById("dvTable");

    for (var i = 0, row; row = x.rows[i]; i++) {
   
   for (var j = 0, col; col = row.cells[j]; j++) {
     console.log(col.innerHTML);
   }  
}
}


const btnid = function(){
  var e = window.event,
  bton = e.target || e.srcElement;
   return (bton.id);
}

const contrib = function(Raddress, amount){
 
  fundinghub.contribute(Raddress,{from : web3.eth.accounts[0], value : amount, gas: 4712388, gasPrice : 0})
  .then((transaction) =>{
    console.log(transaction);
  
     createTable();
  });

}

