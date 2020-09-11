// Rails: Ruby framework for webservers

// Node: Javascript out-of-the-browser, on the command line, as a systems programming language

  // Express: a framework for doing webserver routing
  //   Express !== Rails
  // It's closer to Sinatra: JUST the route handling
  // - no DB (use 'sequel' package to talk to Postgresql)
  // - no templates (use 'ejs' or 'handlebar')
  // - "MERN" stack:
  //    - MongoDB (database)
  //    - Express
  //    - React
  //    - Node

// The 'require()' function is how you do 'import'
// in older Node.js environments, "CommonJS"

// 'http' is a built-in package,
// i.e. it does NOT need a 'npm install http'
const http = require('http');

http.createServer( (req, res) => {
  // This callback code will run every time
  // this server receives a request
  // The callback gets passed a 'req' and 'res' argument,
  // representing the request that was made, and the
  // respose we are constructing.

  console.log(`Serving request: ${ req.method } ${ req.url }`);

  res.writeHeader( 200, { 'Content-Type':'text/html' } );

  // res.end('HELLO WORLD! DOES THIS APPEAR?');

  // So tedious to write this out manually!
  // THERE'S GOT TO BE A BETTER WAY!!!!!
  // Enter... Express
  if( req.url === '/' ){
    res.end('<h1>Welcome to my site!!!!!</h1>')
  } else if( req.url === '/dogs' ){
    res.end('<p>Info about dogs here</p>');
  } else if( req.url === '/guestbook' ){
    res.end('<p>Please sign my guestbook!!!111!!</p>');
  } else {
    res.end('<img src="http://www.fillmurray.com/300/300"/>');
  }

}).listen(1337); // Start listening on the specified port

console.log('Server is running at http://localhost:1337 ...');
