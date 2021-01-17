const BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = '24d863d54c86392e6e1df55b9a328755';

// 1. Look up credits for 'Alien' movie:
//    https://api.themoviedb.org/3/movie/348/credits?api_key=24d863d54c86392e6e1df55b9a328755
// 2. NESTED QUERY: Now make another request to the API, to get all the movies this cast member has appeared in
//    https://api.themoviedb.org/3//person/${ PERSON_ID }/movie_credits?api_key=24d863d54c86392e6e1df55b9a328755
// 👇
// The problem: waiting for the results of one async operation, in order
// to start the next one.... too much nesting, a.k.a. "callback hell pyramid"

// 1. Look up credits for 'Alien' movie
// const url = `https://api.themoviedb.org/3/movie/348/credits?api_key=${ API_KEY }`
// axios.get(`${ BASE_URL }/movie/348/credits?api_key=${ API_KEY }`)
// .then( movieCredits => {
//   console.log(movieCredits.data);
//
//   // 2. Get other movie credits for first cast member
//   const firstCastMember = movieCredits.data.cast[0];
//   console.log(firstCastMember.name, firstCastMember.id);
//
//   // 3. NESTED QUERY: Now make another request to the API, to get
//   // all the movies this cast member has appeared in:
//   axios(`${ BASE_URL }/person/${ firstCastMember.id }/movie_credits?api_key=${ API_KEY }`)
//   .then( actorCredits => {
//     const movies = actorCredits.data.cast.map( m => m.title );
//     console.log( movies.join('\n') );
//   })
//   .catch( console.warn )
//
// })
// .catch( console.warn );


//
// Using promises correctly: CHAIN together, instead of NESTING
if(false){

axios.get(`${ BASE_URL }/movie/348/credits?api_key=${ API_KEY }`)

// .catch( err => {
//   console.log('error ine credits lookup');
//   // THIS .catch() WILL CAUSE THE FOLLOWING .then() to run,
//   // since catching a rejected promise automatically counts as resolving it!
//
//   // To skip the following then()s, throw a new error for the next catch!
//   throw new Error('Credits request failed!');
// })

.then( movieCredits => {
  console.log(movieCredits.data); // typos and other errors will be caught by .catch() too!

  // 2. Get other movie credits for first cast member
  const firstCastMember = movieCredits.data.cast[0];
  console.log(firstCastMember.name, firstCastMember.id);

  // 3. NESTED QUERY: Now make another request to the API, to get
  // all the movies this cast member has appeared in:
  // RETURN the promise axios returns, and we can chain the next .then()!

  return axios.get(`${ BASE_URL }/person/${ firstCastMember.id }/movie_credits?api_key=${ API_KEY }`);
  // return { data: { cast: [ {title:'a'}, {title:'b'} ] } };  // this works too!

})

// This .then() will handle whatever value is returned by the previous .then() callback
// - doesn't have to be a promise, but if it is, we get the resolved value if it worked,
// otherwise the next .catch() in the chain will catch it
.then( actorCredits => {
  // got here?
  console.log('actor query')
  const movies = actorCredits.data.cast.map( m => m.title );
  console.log( movies.join('\n') );
})
.catch( err => {
    console.warn('problem!', err);
    console.dir(err);
});
}//false

// Using async/await
const getInfo = async () => {
  try {
    const movieCredits = await axios.get(`${ BASE_URL }/movie/348/credits?api_key=${ API_KEY }`);
    const firstCastMember = movieCredits.data.cast[0];

    const actorCredits = await axios.get(`${ BASE_URL }/person/${ firstCastMember.id }/movie_credits?api_key=${ API_KEY }`);
    const movies = actorCredits.data.cast.map( m => m.title );
    console.log( movies.join('\n') );
  } catch( err ){
    console.log('error!', err);
  }

}; // getInfo()

getInfo();


//////////////////////////////////////////////////////////////// original
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
