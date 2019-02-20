pragma solidity ^0.4.6;
import "./Project.sol";

contract FundingHub  {
    address [] public ProjectAdd;
    function FundingHub(){}
    
    function CreateP(bytes32 _name, address _owner, uint _amount, uint _deadline){

        address _newProjectAdd = new Project(_name, _owner, _amount, _deadline);
        ProjectAdd.push(_newProjectAdd);
    }
    
    function contribute(address _project) payable
    public{
        if(Project(_project).getStatus()>0){
            throw;
        }
        
        if(now > Project(_project).getDeadline()){
            
            Project(_project).refund();
        } 
        else{
            Project(_project).fund.value(msg.value)(msg.sender);
        }
        
    }
    function getProjects() constant returns (address[]){
        return ProjectAdd;
    }
    function latestProject() constant returns (address){
     return ProjectAdd[ProjectAdd.length-1];
    }
    function getProjectInfo(address _project) constant returns (bytes32,address,uint, uint, uint, uint, address){
        return (Project(_project).getName(),_project, Project(_project).getAmount(), _project.balance,Project(_project).getDeadline(), Project(_project).getStatus(), Project(_project).getOnwer() );
        
    }

        
}