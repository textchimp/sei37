console.log('main.js loaded');

// axios.get(url)  // 'then'-able.. "pending"
// .then(handler)  // "fulfilled"
// .catch(errorHandler); // "rejected"


const waiter = (message, forceResolve=false) => {

  return new Promise( (resolve, reject) => {

    // Do whatever work you need to do here,
    // usually something that takes time or that
    // makes a network/DB request

    console.log('Inside the promise callback', message );

    setTimeout( () => {
      // This code happens after the 3s timeout:
      console.log('Timeout!', message);

      const coinToss = Math.random();
      if( forceResolve || coinToss > 0.5 ){
        // Call the resolve function (argument)
        console.log('RESOLVING: ', message);
        resolve({ status: 'resolved', message, coinToss });
      } else {
        console.log('REJECTING:', message );
        reject({ status: 'rejected', message, coinToss });
      }

    }, 3000 );

  }); // new Promise

}; // end of waiter()



// Promise.all([])
// .then( data => { });

// waiter('first')
// .catch( err => {
//   console.log('First waiter REJECTED');
//   return waiter('first-backup');
// })
// .then(  data => {
//   console.log('.then() RESOLVED:', data);
//   // returning a promise from here will be handled
//   // by the following .then() in the chain - NO NESTING
//   return waiter('second', true);
// })
// .then( data => {
//   console.log('second .then() RESOLVED', data);
//   return waiter('third');
// })
// .then( finalData => console.log('Third/final RESOLVED', finalData) )
// .catch( err => console.warn('.catch() REJECTED!', err) );


// Async/await
// "Syntactic sugar" for a chain of .then() / .catch()

const waitersExample =  async () => {

  try {
    const firstData = await waiter('first');
    console.log('Waiter first resolved', firstData);
    const secondData = await waiter('second');
    console.log('Waiter second resolved', secondData);
  } catch( err ){
    console.log('Error happened!', err );
  } finally {
    console.log('Either way, this runs');
  }

  console.log('The very last thing to happen');

};

// const result = waitersExample();
