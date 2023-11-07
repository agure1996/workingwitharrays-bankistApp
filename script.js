'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// LECTURES

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

/*From making if/else statement we simplified it to one line of code */
const movementDescription = movements.map((mov, i) => {
  return `Movement #${i + 1}: You have successfully ${
    mov > 0 ? `deposited` : `withdrawn`
  } ${Math.abs(mov)}`;
});

/////////////////////////////////////////////////
/* We will read the movements from each account, and we do that by looping through the movement of an account
 * But also by creating a new row for each movement, copying the existing css/html style and coding the JS 
   to create a new row for each new movement, while also keeping track of its type
 */

const displayMovements = (movements, sort = false) => {
  /* Empty the container of the dummy data first */
  containerMovements.innerHTML = '';

  /**recently added the sort as an argument to
   * display movements, we do this so we can sort out the
   * movement array using slice and sort method.
   * we used slice to get a copy of the movement array,
   * we are in the middle of a chain so we use slice instead of chaining method
   *
   */
  const sortingMovements = sort
    ? movements.slice().sort((a, b) => a - b)
    : movements;

  sortingMovements.forEach((mov, i) => {
    /* If the movement value is less than 0 or greater than 0 to determine if its a withdrawal or deposit
       we write deposit or withdrawal  */
    const type = mov > 0 ? `deposit` : `withdrawal`;
    const html = `
        <div class="movements__row">
        <div class="movements__type
         movements__type--${type}">${i + 1} ${type}</div>
        <div class="movements__value">${mov}€</div>
      </div>
      `;
    /* Append the new row into the movement container using insertadjacenthtml */
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

/////////////////////////////////////////////////

/**Creating deposits array
 * filter through values to determine if the value is a deposit and then log it
 */

/////////////////////////////////////////////////
const calcDisplayBalance = acc => {
  acc.balance = acc.movements.reduce((accum, cur) => accum + cur, 0);
  /* now we will display the balance in the dom value of balance */
  labelBalance.textContent = `${acc.balance}€`;
};

/////////////////////////////////////////////////

//Event handler

/////////////////////////////////////////////////

/**Calculate display summary of income, outcome and interest */

const calcDisplaySummary = acc => {
  //Income
  const income = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumIn.textContent = `${income}€`;

  //Outcome
  const outcome = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumOut.textContent = `${Math.abs(outcome)}€`;

  //Interest calculations
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(interestVal => interestVal >= 1)
    .reduce((acc, interest) => acc + interest, 0);
  labelSumInterest.textContent = `${interest}€`;
};

////////////////////////////////////////////////////////////////////////

/**Creating username value using user initials
 * 1-make name lower case
 * 2 split name by the ' ' gaps to get each name as a value
 * 3-Map through each individual name and return first letter only
 * 4-join the mapped array values together removing the gaps
 * 5- result : 'Steven Thomas Williamson' >>> stw
 * 6- extra step is we edit the method
 *  so it takes in the actual usernames from the account array in account.owner and abbreviates them to make the username
 * 7- added username value to each account object based on each account owner
 */

////////////////////////////////////////////////////////////////////////

const createUserNames = accs => {
  accs.forEach(acc => {
    /**assign username variable of each account we loop through to the owner variable in each account,
     * we do this because we will manipulate the owner variable to make initials which will be the username.*/
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => {
        return name[0];
      })
      .join('');
  });

  /*We do not return anything because we are using the account object to produce a side effect
   e.g. create initials from the username values*/
};

//call method to create the accounts
createUserNames(accounts);

/////////////////////////////////////////////////////////////////

//Will need currentAccount for when someone logging in
let currentAccount;

//do not want to recycle methods so I will put them into one method
const updateUI = acc => {
  //Display Movements
  displayMovements(acc.movements);

  //display balance
  calcDisplayBalance(acc);

  //Display Summary
  calcDisplaySummary(acc);
};

btnLogin.addEventListener('click', e => {
  //prevent form from submitting
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    //clear login and pin fields
    inputLoginUsername.value = inputLoginPin.value = '';

    inputLoginPin.blur();

    updateUI(currentAccount);
  }
});

/////////////////////////////////////////////////////////////////
/**Implementing transfers:
 *
 * 1- add action listener to button
 */

btnTransfer.addEventListener('click', e => {
  //prevent refreshing of browser which is a default action of forms
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc?.username === inputTransferTo.value
  );

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    console.log(amount, receiverAcc, 'Transfer Valid');
    alert('Congratulations your transfer was successful');
    inputTransferAmount.value = inputTransferTo.value = '';

    //Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    updateUI(currentAccount);
  } else {
    console.log('Transfer Invalid, Try again');
    alert('Transfer Invalid, Try again');

    //clear fields
    inputTransferAmount.value = inputTransferTo.value = '';
  }
});
/////////////////////////////////////////////////////////////////
/**Implementing loan function
 *
 * Bank has a rule for loans:
 *  Only grants loan if there is a deposit up to 10% of the requested loan amount
 *
 */

btnLoan.addEventListener('click', e => {
  //prevent refreshing of browser which is a default action of forms
  e.preventDefault();

  const loanAmount = Number(inputLoanAmount.value);

  if (
    loanAmount > 0 &&
    currentAccount.movements.some(mov => mov >= loanAmount * 0.1)
  ) {
    currentAccount.movements.push(loanAmount);
    alert('Loan Request accepted');
  } else {
    alert('Loan Request rejected');
    inputLoanAmount.value = '';
  }
  updateUI(currentAccount);
});

/////////////////////////////////////////////////////////////////
/**Implementing account deletion
 *
 *
 */

btnClose.addEventListener('click', e => {
  //prevent refreshing of browser which is a default action of forms
  e.preventDefault();

  //if user and pin values inputted are the same as the users username and pin currently logged in.
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    //assign index to a variable, a variable we will search for in the account array since we want to delete it
    const index = accounts.find(
      acc => acc.username === currentAccount.username
    );

    //use splice method to manipulate the accounts array and delete the selected index if found, and delete the single value itself
    accounts.splice(Number(index), 1);

    containerApp.style.opacity = 0;
    alert('Account Successfully Deleted');
    labelWelcome.textContent = 'Log in to get started';
  } else {
    alert('Incorrect user or pin, try again');

    //clear fields
    inputCloseUsername.value = inputClosePin.value = '';
  }
});
/////////////////////////////////////////////////////////////////
/**Sort button action listener:
 * refer to sort method in movements to get a gist of how sorting works */

//we will use a sorted variable
let sorted = false;
btnSort.addEventListener('click', e => {
  //prevent refreshing of browser which is a default action of forms
  e.preventDefault();

  //call the display movement method
  displayMovements(currentAccount.movements, !sorted);
  btnSort.textContent = sorted ? '↓ SORT' : '↑ SORT';
  sorted = !sorted;
});

/////////////////////////////////////////////////////////////////

/**Array methods practice:
 *
 * we will practise array methods and chain them to do actions for us
 */

/**1 -  we will attempt to get the deposits of all movements
 * when we want to create a new array thats the same size as another array we use the function .map() function
  we want the arrays nested to all be put into one array so we use flat, but since every array is nested one tier
  we use flatMap 
  
  we also want the deposits so values > 0*/
const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((acc, mov) => (acc += mov), 0);

console.log(bankDepositSum);

/** 2- we will get the number of deposits over 1000
 *
 * 2 ways
 */
//way 1
const numDeposit1000 = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov >= 1000).length;
//way 2
const numDeposit10002 = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, curr) => (curr >= 1000 ? count + 1 : count), 0);

console.log(numDeposit10002);

/** 3 - create an object that holds sum of deposits and the sum of the withdrawals
 *
 *
 * option 1 - reduce method, sum becomes the accumulator value,
 * loop through array and set the 0 value for deposit and withdrawal since we will accumulate number to each value
 * we have to remember in reduce functions you have to return the accumulator normally.
 *
 * we take this a notch further by destructuring sums const
 *  and putting deposit and withdrawal instead so we can call them in console.log
 *
 *
 *
 * but we can take this a step further
 * since jonas dont like duplication he did the following:
 *
 * changed the reduce method to tertiary and use the bracket notation instead of the dot notation,
 *
 * this way we create a brand new object using the reduce method
 */

// const {deposit, withdrawal} = accounts.flatMap(acc=> acc.movements)
// .reduce((sum,curr) =>{ curr > 0 ? sum.withdrawal+=curr : sum.deposit += curr; return sum },{withdrawal:0,deposit:0})

// console.log(sums);

// console.log(deposit,withdrawal);

// const {deposit, withdrawal} = accounts.flatMap(acc=> acc.movements)
// .reduce((sum,curr) =>{
//   sum[curr > 0 ? 'deposit' : 'withdrawal'] += curr;
//   return sum;
//  },{withdrawal:0,deposit:0})

//  console.log(deposit,withdrawal);

/**
 * 4 - a simple function, convert any string to a Title Case
 *
 * this is a nice title case => This Is a Nice Title Case
 * 
 * keep in mind some words are not capital in the english languge, the conjunction words
 * those are put in a seperate array to be compared in our string, which we split and then rejoin back together when we make the first letter of each seperated word capital
 * 
 * but then we have a problem, what happens when the title case starts with an a, or an or and. Its the beginning of a sentence. . .we have to capitalise it, so we create a method that capitalises the first letter regardless of word
 * 
 * this is similar to the original idea of how we split the word then capitalised the first letter.
 *
 */

// const convertTitleCase = title => {
//   const titleExceptions = [ 'a', 'and','an','the', 'but', 'or','on','in', 'with',];

//   const capitalize = string => string[0].toUpperCase() + string.slice(1)
//   const titleCase = title
//     .toLowerCase()
//     .split(' ')
//     .map(word => titleExceptions.includes(word)? word : capitalize(word))
//     .join(' ');

//   return capitalize(titleCase);
// };

// console.log(convertTitleCase('a this is a nice title case'));

/////////////////////////////////////////////////////////////////

/** These some/every/includes methods will aid in us understanding how the method work 
 * as well as be used for the loan feature as shown above
 * 
console.log('Using the includes method to check of movements value of -100 exists');
//This includes method checks for equality, some method returns true even if only some of values meet argument
console.log(movements.includes(-100));

console.log('Check if there were any deposits over 5000 using the some method:');
//this some method checks for a condition to see if it is met
const anyDeposits = movements.some(mov => mov > 5000)
console.log(anyDeposits);
*/

/////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////
/** Notes 
 * 

 *We can use reduce to get largest value as shown below:
 *
 * const largestVal = movements.reduce((accum, curr) => accum > curr ? accum : curr, movements[0]);
 * console.log(largestVal);
 *
 * 
 * How to search for existing account in account array as well as the password pin if its correct using find method
 *  const account = accounts.find(acc => acc.pin === Math.abs(1111));
 * 
 * 

 
 


/////////////////////////////////////////////////

 *
 *
 * Convert total deposit into USD while chaining filter > map > reduce functions
 * Keep in mind that while map and filter return arrays, reduce method returns a value
 *  so you cannot chain map or filter after a reduce method
 *
 
// const euroToUSD = 1.5;
// const totalDepositsToUSD = movements
//   .filter(mov => mov > 0)
//   .map(mov => mov * euroToUSD)
//   .reduce((acc, curr) => acc + curr, 0);
// console.log(totalDepositsToUSD);

 *Keep in mind most of the map/filter functions consist of the input values of (mov,i,arr), which we dont use here
 * the arr can be used to help debug so we can look at the value of the array when we are trying to debug
 *
 


/////////////////////////////////////////////////////////////////


 *Creating deposits array
 *
 * filter through values to determine if the value is a deposit and then log it
 *

// const withdrawal = movements.filter(mov => mov < 0);
// const deposit = movements.filter(mov => mov < 0);
// console.log(`Withdrawals: ` + withdrawal);
// console.log(`Deposits: ` + deposit);
/////////////////////////////////////////////////

 *Get the total balance in the bank account via reduce method
 * Display it in the balance value
 *
 *

//accumulator = sum of all the values, think of a snowball
// const balance = movements.reduce((accum,cur,i,arr) => {
//   console.log(`Iteration ${i+1} current value ${cur}, accumulator is currently ${accum} before adding the current value`);

// return accum += cur
// },0 ); //initial value of accumulator is 0
// console.log(`Current balance is ${balance}€`);
//Short hand writing of method above
*/
/////////////////////////////////////////////////
/**Testing Flat and Flat map methods:
 *Good for getting array values in nested arrays and putting them into single array 

//Flat method
// const flatArr = accounts.map(acc => acc.movements)
//depending on value placed in flat method below, you control the depth level you want to flatten out, but by default it flattens only to one level
// .flat()
// .reduce((acc,mov) => acc+=mov,0);
// console.log(flatArr);

//FlatMap method - flatmap unlike flat only flattens nested arrays by one level
// const flatMapArr = accounts.flatMap(acc => acc.movements)
// .reduce((acc,mov) => acc+=mov,0);
// console.log(flatMapArr);
*/
/////////////////////////////////////////////////
//if <0,1, A,B (keep order) ascending order
//if >0 ,-1  B,A(to switch order) return 1 means keep order, and return -1 means to switch order of two things being compared in this example descending order
// console.log(movements.sort((a,b) => a> b ? 1 : -1)) ;
/**Theres more ways of creating and filling arrays
 */
// const arr = new Array(8);
/////////////////////////////////////////////////////////////////
// console.log(arr);

// arr.fill(112,2,4);
// console.log(arr);
//theres also the fill method to fill empty array with values, you can combo fill with creatig an array

// console.log('////////////////////////////////////');
// and lastly you can combo the two above like this
// const arr2 = Array.from({length:7},(curr,i) => 1)
// console.log(arr2);

///////////////////////////////
// The following above is teaching us how we can use these array methods to look at the movement data

// labelBalance.addEventListener('click',()=>{

//   const movementUI = Array.from(document.querySelectorAll('.movements__value'))

//   console.log(movementUI.map(element => Number(element.textContent.replace('€',''))));})
//.sort((a,b) => a-b) = we can attach this sort method if we want to sort the movement ui

/////////////////////////////////////////////////
