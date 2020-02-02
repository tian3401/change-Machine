class StateManager {
  constructor(state, amount) {
    this.state = state,
    this.pendingState = null; 
    this.amountCopy = amount
    this.amount = amount,
    this.combo = {}
  }
  
  checkIfPossible() {
    //Deep clone the state 
    let possibleState = JSON.parse(JSON.stringify(this.state));
    
    for(let i=this.state.length -1; i>=0; i-- ) {
      let subArray = this.state[i]
      let slot = subArray[0]
      let quantity = subArray[1]
   
      this.subtractHandler(this.amountCopy, slot, quantity, i,possibleState)
    }
    
    this.pendingState = possibleState; 
    this.makeCombo(possibleState);
    
    if(this.amountCopy === 0) {
     
      return true;
    }
 
    return false;
 
  }
  
  subtractHandler(remainingAmount, denom, quantity, index, state) {
    
    //Decrements the amount by using recursion.
    //Recursion probably isn't the most optimal time or space solution, so would need to refactor
    //Seemed like the most straight forward to me though. 
    let leftOverAmount = remainingAmount - denom
    
    //Checks to see if amount can be subtracted
    if((leftOverAmount >= 0) && (quantity > 0)) {

      let remainingCoins = quantity - 1
      remainingAmount = leftOverAmount;

      state[index][1] = remainingCoins;

      //base case 
      if(remainingAmount === 0) {
          this.amountCopy = 0
          return;
      }
      //recursive case 
      this.subtractHandler(remainingAmount, denom, remainingCoins, index, state)
    }

    else if(leftOverAmount < 0 || quantity <= 0){
      this.amountCopy = remainingAmount 
    }
 
    return 
    
  }
 
  makeChange() {
    //This issues the change
    this.state = this.pendingState;
    this.printInventory()
  }
  
  makeCombo(possibleState){
    
    function* PossibleCoinGenerator () {
      
      for(let subArray of possibleState) {
        yield subArray; 
      }
    }
    
    //When called the iterator feeds one subarray
    const coinIterator = PossibleCoinGenerator(); 
    
    for(let subArray of this.state){
        let key = subArray[0];
        let value = subArray[1];
        //subarray is requested
        let possibleStateSubArray = coinIterator.next().value; 
        let possibleStateValue = possibleStateSubArray[1]
       
        this.combo[key] = value - possibleStateValue
    }
    
    return this.combo
  }
  
  printInventory() {
    console.log(`This is an inventory of your coins`)
    console.log(this.state)
  
  }
  
  remainingCoinInRegister() {
    
    let totalSum = 0; 
    
    for(let subArray of this.state) {
      let sum = subArray[0] * subArray[1]
      totalSum +=sum;
    }
    
    return totalSum
  }

}

class FunctionRunner {
  constructor(fn) {
    this.fn = fn
  }
  
  run(state) {
    return this.fn(state)
  }

}

//This is where I was thinking of storing previous changeMachine's calls
const storeOfMachines = {

  //Code to ensure changeMachines are stateful 
}


function recordMachine () {

  //Code to record the last accepted combination of a given changeMachine 

}

function makeChangeMachine(startingChange) {
  
  const copy = {...startingChange}; 
  //Change data structure to array so easier to for loop 
  const arrayOfStartingChange = Object.entries(copy)

  
  const changeMachine = (
    
    function(state,amount,fn1,fn2) {
      
      const testMachine = new StateManager(state,amount)
      const successFn = new FunctionRunner(fn1)
      const failureFn = new FunctionRunner(fn2)

      const checkPossible = testMachine.checkIfPossible();
      
      if(checkPossible) {

        //Checks to see if the success function returns true 
        if(successFn.run(testMachine.combo) === true) {
          
          console.log(`Issuing Change!!!!`)
          testMachine.makeChange()
  
          return

        } else{
          //Possible, but successFn does not return true
          console.log(`Possible to make change, but success function does not return true.`)
          testMachine.printInventory();

          return 
        }
        
        
      } else {
        failureFn.run(); 

        let remainingCents = testMachine.remainingCoinInRegister();
        console.log(`because the previous call used up all but ${remainingCents}¢`)
      }
      
  })
  
  return changeMachine.bind(this,arrayOfStartingChange) 
}







