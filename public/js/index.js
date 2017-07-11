var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');

  socket.emit('createMessage', {
    from: 'Grant',
    text: 'Yup, that works for me.'
  });//emit createMessage

});// on connect

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});// on disconnect

socket.on('newMessage', function (message) {
  console.log('newMessage', message);
});// on newMessage
