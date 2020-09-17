const express = require('express');
const app = express();

// Serve static files from the public/ folder
app.use( express.static('public') );

const server = app.listen(3333, () => {
  console.log('HTTP server listening on http://localhost:3333 ...');
});

// const setup = require('socket.io');
// const io = setup( server );
const io = require('socket.io')( server );


io.on('connection', socket => {
  // This code runs whenever a browser (client)
  // connects to this websocket server from the frontend
  //
  // The specific browser/client that just connected
  // is made available to use as the 'socket' argument
  // to this callback

  console.log('Connection made!', socket.conn.id );

  // broadcast to every connected user!
  io.emit('joined', {
    content: 'User has joined!',
    socketID: socket.conn.id
  });

  // Send a message directly to just the user who has joined:
  socket.emit('personal-welcome', {
    message: 'Hello new connectee, welcome to the chat'
  });


  // Listen for a message emitted from the frontend:
  socket.on('welcome', data => {
    console.log('Got WELCOME message from frontend', data);
  });

  setInterval( () => {
    socket.emit('timer-message', {
      text: 'Just checking in...'
    });
  }, 2000 );


}); // on socket connect
