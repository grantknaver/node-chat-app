var socket = io();

function scrollToBottom () {
  //seclectors
  var messages = $('#messages');
  var newMessage = messages.children('li:last-child');
  //heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }//if

}//scrollToBottom

socket.on('connect', function () {
  var params = $.deparam(window.location.search);

  socket.emit('join', params, function (err)  {
    if (err) {
      alert(err);
      window.location.href = '/';
    } else {
      console.log('No error');
    }
  });
});// on connect

socket.on('updateUserList', function (users){
  var ol = $('<ol></ol>');
  users.forEach(function(user) {
    ol.append($('<li></li>').text(user));
  });

  $("#users").html(ol);
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});// on disconnect

socket.on('newMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = $('#message-template').html();
  var  html = Mustache.render(template, {
    text : message.text,
    from: message.from,
    createdAt: formattedTime
  });

  $('#messages').append(html);
  scrollToBottom();
});// on newMessage

socket.on('userTaken', () => {
  alert('user is taken');
}); // on userTaken

socket.on('newLocationMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = $('#location-message-template').html();
  var  html = Mustache.render(template, {
    text : message.text,
    from: message.from,
    url: message.url,
    createdAt: formattedTime
  });

  $('#messages').append(html);
  scrollToBottom();
});//socket on click

$('#message-form').on('submit', function(e) {
  e.preventDefault();

  var messageTextbox = $('[name=message]');

  socket.emit('createMessage', {
    text: $('[name=message]').val()
  }, function () {
    messageTextbox.val('');
  });
});
var locationButton = $('#send-location');
locationButton.on('click', function (){
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }
  locationButton.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function (position){
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location.');

  })
});
