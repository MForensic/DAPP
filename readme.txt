# b9lab-final-project


The (simple) userinterface of this project consist of following parts
Initially when the page loads there are 4 input boxes and one button
1) Name : Project name
2)Owner : Project Owner (Address)
3)Amount : Amount to be raised
4)Deadline : Deadline after which  refund() will be invoked
5)Add : Will populate the table with projects. UI.png shows how the table looks.

The table has the following fields:
Project name	project name
Project Address	project address
amount required	amount to be raised
amount raised	sum of all funds collected until now
Deadline        Deadline
Status          0 = active, 1=paidout, 2=Refunded (Only active project can be funded)
Click2Fund      contains buttons
funding amount  Input box for entering funding amount
Project Owner	owner address

How to fund?
 A user can simply enter the amount into cell respective input box of the project and simply press fund.
 UI gets updated automatically once a project is added or a project is funded.
 Each project can have one of 3 states: 

 If a project is not active "fund" in UI gets disabled.



Testing: Refund function has been tested based on following scenarios:
  1. Create a new project with owner account[0]
  2. Account[1] one makes a contribution
  4. Assert that the balance of the account[1] has been decreased by at least 0,01 ether
  5. Assert that the raised amount of the project has increased by 0,01 ether
  6. refund is initiated.
  7. Assert that the project raised amount has been decreased by 0,01 ether 
  8. Assert that the end balance of the account is higher then start balance


Cheers,
Mohammad Mussadiq jalalzai
  

