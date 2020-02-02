# change-Machine
This is my solution to a coding challenge that requires you to create a change machine that takes an amount and gives the required amount of change from the given register.

## Initializing change machine
To create your change machine you must call the makeChangeMachine function and pass in the initial state of the starting register.

`const myChangeMachine = makeChangeMachine({ 1: 20, 5: 3, 10: 4, 25:3 })`

## Feeding your change machine

Once you have initialized your change machine, a function will be returned. 

`myChangeMachine(amount,successFunction, failureFunction)`

###### Arguments of the change machine

`amount` is the amount you want to convert into change. 
`successFunction` is the function that will run if the change machine is able to make the change for the given amount
`errorFunction` is the function that will run if it is not possible to make change 

###### Success function Requirements

The success function must `return true` for the change to be executed. 

If you `return false`, the change machine will show the combination of coins that will be received for the given amount, but it will not issue the change.

###### Failure function Requirements

If the change machine is able to give change for the inputed amount, it will run the failure function. 

## Accessing the Change Given

In order to access the change given, you include the print function expression inside your functions.

```const print = combo => console.log(`
  ${combo[1]} pennies
  ${combo[5]} nickels
  ${combo[10]} dimes
  ${combo[25]} quarters`);```
  
  
