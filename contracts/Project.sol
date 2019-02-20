
pragma solidity ^0.4.6;
contract Project {
    struct   project {
        bytes32 name;
        address owner;
        uint amount;
        uint deadline;
        uint pStatus; // 0 = active, 1=paidout, 2=Refunded
    }
    mapping(address => uint)Contributions ;
    address[] contributors;
    project public thisProject;
	//Fallback function should throw

	function () { 
		throw; 
	}
   
    function Project (bytes32 _name, address _owner, uint _amount, uint _deadline){
        thisProject.name= _name;
        thisProject.owner = _owner;
        thisProject.amount = _amount;
        thisProject.deadline = _deadline;
        thisProject.pStatus = 0
        ;
        
    }
    function fund(address _contributor) payable{
        if (thisProject.pStatus>0){
            throw;
        }
        if(Contributions[_contributor]==0){
          contributors.push(_contributor);  
            
        }
        Contributions[_contributor]=+msg.value;
        if (this.balance >= thisProject.amount){
        thisProject.pStatus=1;
        payout();
        return;
    }
    }
    
    function refund() payable{
        thisProject.pStatus=2;
        for (uint i=0;i<contributors.length;i++){
           uint _contribution = Contributions[contributors[i]];
           Contributions[contributors[i]]=0;
           if(!contributors[i].send(_contribution)){
               throw;
           }
        }
        
    }
    
    function payout() payable{
        if(thisProject.pStatus==1){
            if(!thisProject.owner.send(this.balance)){
                throw;
            }
        }
        
    }
    
    function getDeadline() constant returns (uint){
        return thisProject.deadline;
    }
    
    function getAmount() constant returns (uint){
        return thisProject.amount;
    }
    function getStatus() constant returns (uint){
        return thisProject.pStatus;
    }
    function getName() constant returns (bytes32){
        return thisProject.name;
    }
    
    function getOnwer() constant returns (address){
        return thisProject.owner;
    }
}
