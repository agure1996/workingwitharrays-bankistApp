// const currencies = new Map([
//     ['USD', 'United States Dollars'],
//     ['GBP', 'Great British Pounds'],
//     ['EUR', 'Euros'],
//     ['SAR', 'Saudi Riyals'],
// ])

// /* For each  is used in this order when calling arguments [value, key, array/map]*/
// currencies.forEach((value,key,array)=>{
//      console.log(`${key} : ${value}`);
// }
// )

///////////////////////////////////////
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

-Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
-Can use slice method and remove the incorrect values, or the splice one, difference between both is slice creates a new array, but follow instructions above

2. Create an array with both Julia's (corrected) and Kate's data
-This probably will require the slice method

3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
-If statement/tertiary, map through it as well

4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// const juliaDogs =[3, 5, 2, 12, 7];
// //slice out the range of values that are dog ages
// const juliaActualDogs = juliaDogs.slice(1,3)
// // console.log(juliaActualDogs);

// const kateDogs =[4, 1, 15, 8, 3];

// //all dogs added into one array by joining/concatenating both arrays
// const allDogs = juliaActualDogs.concat(...kateDogs);
// // console.log(allDogs);

// //Map through the concatenated array and produce a result
// allDogs.map((dog,i) => {
//     dog >= 3 ? console.log(`Dog number ${i+1} is an adult, and is ${dog} years old"`) : console.log(`Dog number ${i+1} is still a puppy 🐶`)
// });

///////////////////////////////////////
// Coding Challenge #1 Complete!!!
///////////////////////////////////////

/* 
///////////////////////////////////////
// Coding Challenge #2
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// const calcDA = ages => {

//     //calculate dogs ages, pups = age*2 , adults = 16+age *4
//   const humanAge = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));

//   console.log(humanAge);
//     //getting rid of the puppies from the age array
//   const adultDogs = humanAge.filter(age => age >= 18);
//   console.log(adultDogs);

//   //calculating avg human age, using reduce method
//   const avgAge = adultDogs.reduce((accum,age) =>
//     accum+=age

//   ,0) / adultDogs.length;

//   console.log( avgAge);
// };

//concat test data sets so we can run them together
// const td1 = [5, 2, 4, 1, 15, 8, 3];
// const td2 = [16, 6, 10, 5, 6, 1, 4];
// const td = td1.concat(...[td2]);
// calcDA(td);

// calcDA(td1);
// calcDA(td2);

///////////////////////////////////////
// Coding Challenge #3

/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// const calcDA = ages => 
//   ages
//     .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
//     .filter(age => age >= 18)
//     .reduce((accum, age, i, arr) => accum += age / arr.length, 0)
/* Keep in mind the find method can be called, it works like filter method but will find the first value/object that satisfies criteria */


// console.log(calcDA(td));

/**Let me briefly explain something about arrow functions:
 * 
 * If an arrow function when im evaluating a single input, and I use curly braces, I must use a return statement 
 * or else I will get undefined.
 * 
 * refer to this stackoverflow question:https://stackoverflow.com/questions/41742934/why-does-having-map-with-curly-brackets-change-the-way-it-works
 */

///////////////////////////////////////
// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)

2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓

3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').

4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"

5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)

6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)

7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)

8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

GOOD LUCK 😀
*/


//Test Data

//Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
const dogs = [
    { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
    { weight: 8, curFood: 200, owners: ['Matilda'] },
    { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
    { weight: 32, curFood: 340, owners: ['Michael'] }
  ];





  /*
      1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
   */

    console.log('//////////// Question - 1 //////////////////');

    const recommendedFood = weight => Math.trunc(weight**0.75*28);


  console.log(recommendedFood(dogs[0].weight));

  dogs.forEach(dog => {
    dog.recommendedFood = recommendedFood(dog.weight)
  })
  console.log(dogs);

  /*
      2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
  */

  console.log('//////////// Question - 2 //////////////////');
  const sarahDog = dogs.filter(dog => dog.owners.includes('Sarah'))
  // console.log(sarahDog);
  

  // console.log(`Sarah's dog is eating ${sarahDog.curFood > recommendedFood ? 'above the reccomended amount' : 'below the recommended amount'}`);

  /*
      3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
   */
console.log('///////////// Question - 3 ////////////////////');
    
  const ownersEatTooMuch = dogs.filter(dog => dog.curFood > dog.recommendedFood)
  .flatMap(dog => dog.owners);
  const ownersEatTooLittle = dogs.filter(dog => dog.curFood < dog.recommendedFood)
  .flatMap(dog => dog.owners);

  console.log(ownersEatTooMuch);
  console.log('//// Too Little /////');
  console.log(ownersEatTooLittle);

   /*
      4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
   */

    console.log(` ${ownersEatTooMuch.join(' and ')}'s dogs eat too much`);
    console.log(` ${ownersEatTooLittle.join(' and ')}'s dogs eat too little`);

    /*
      5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
    */

      console.log('///////////// Question -5 //////////////');
      console.log('Is there any dog eating EXACTLY the amount of food that is recommended?');
      const dogEatingExactAmount = dogs.some(dog => dog.curFood === dog.recommendedFood)
      console.log(dogEatingExactAmount);
    /*
      6. Log to the console whether there is any dog eating an Okay amount of food that is recommended 
    */

      console.log('///////////// Question - 6 //////////////');
      console.log('Is there any dog eating an Okay amount of food ?');
      const okAmount = (dog => dog.curFood > 0.9 * dog.recommendedFood && dog.curFood < 1.1 * dog.recommendedFood)
      // console.log(dogs.some(okAmount));


       /*
      7 - array containing dogs eating ok amount of food 
    */

      console.log('///////////// Question - 7 //////////////');
      console.log('List said dogs');
    console.log(dogs.filter(okAmount));

    /*
      8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)
    */
      console.log('///////////// Question - 8 //////////////');
      console.log('Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order');
      const dogsCopy = dogs.slice().sort((a,b) => a.recommendedFood - b.recommendedFood
      )

      console.log(dogsCopy);