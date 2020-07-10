
console.log('Thursday homework: geometry, cash, bank');

console.log('Geometry:');

const rectangle = {
  length: 4,
  width: 4
};

const isSquare = function( rect ){
  // console.log( rect.length, rect.width );

  // if( rect.width === rect.length ){
  //   return true;
  // } else {
  //   return false;
  // }

  return rect.width === rect.length;
};

const result = isSquare( rectangle );
console.log(`Is the rectangle square? ${ result }`);


console.log('Cash Register');

// Input
const cartForParty = {
  banana: "1.25",
  handkerchief: ".99",
  Tshirt: "25.01",
  apple: "0.60",
  nalgene: "10.34",
  proteinShake: "22.36"
};

const cashRegister = function( cart ){

  let runningTotal = 0;

  // for..in
  for( const key in cart ){
    console.log('--------------------------------------');
    console.log( key, cart[key] );
    console.log('current value of runningTotal', runningTotal);
    // runningTotal = runningTotal + parseFloat( cart[key] );
    console.log('current item price', parseFloat(cart[key]) );
    runningTotal += parseFloat( cart[key] );
    console.log('value of runningTotal AFTER addition', runningTotal);
  } // for

  console.log( runningTotal ); // Print out the final running total

}; // cashRegister()


// Output
// cashRegister(cartForParty); // 60.55

console.log('GA BANK! GIVE US YOUR MONEY!!1!');

const bank = {

  accounts: [
    { name: 'Zara', balance: 2 },
    { name: 'Ruby', balance: 100 },
    { name: 'Joel', balance: -1000 },
  ],

  deposit: function( accountName, amount ){
    console.log(`in bank.deposit('${ accountName }', ${ amount })`);

    let foundAccount = false;

    // 1. Find the account by name, i.e. loop through the this.accounts array
    //    and check if any of the account object have the .name === accountName
    for( let i = 0; i < this.accounts.length; i++ ){
      const currentAccount = this.accounts[ i ];
      if( currentAccount.name === accountName ){
        // Found the account we want to deposit into!
        console.log('Found the account!', currentAccount );
        currentAccount.balance += amount;
        foundAccount = true;
        break; // stop searching, there is only one account with this name
      }

    } // for

    if( foundAccount === false ){
      console.log(`No such account: ${ accountName }`);
    }


  } // deposit()

}; // bank
