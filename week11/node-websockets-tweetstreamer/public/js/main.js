console.log('main.js loaded');

// Establish a connection to the websocket server
// TODO: should the websocket server have a unique, separate port?
// Otherwise might interfere with the webserver port
const socket = io.connect('http://localhost:3333');

socket.on('connect', () => {
  console.log('Websockets connection established!');
}); // on socket connect

// Listen for specific events/message types over the connection:

socket.on('joined', data => {
  console.log('User JOINED event!', data);

  // Send a message to the server, welcoming the new user
  socket.emit('welcome', {
    text: "Let's all welcome our new chat friend!"
  });

});

// Listen for a message from the server, sent just to us (when we connect)
socket.on('personal-welcome', data => {
  console.log('PERSONAL-WELCOME message received:', data);
});

socket.on('timer-message', data => {
  console.log('TIMER-MESSAGE received:', data);
});
