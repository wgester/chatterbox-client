//GET function
var allRooms = {};
var get = function(){
  $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
      data: {'order' : '-createdAt'},
      success: function(data){
        $('#allMessages').text('');
        for (var i = 0; i < data.results.length; i++){
            var roomname = removeTags(data.results[i]['roomname']);
            var username = removeTags(data.results[i]['username']);
            var message = removeTags(data.results[i]['text']);
            if(!(allRooms[roomname]) && roomname && (roomname !== 'main')){
                $('#rooms').append('<button id='+ roomname +'>' + roomname +'</button>'); 
                allRooms[roomname] = roomname;  
            }
            if(message.length <= 140){
                $('#allMessages').append('<li class='+username+'>' + '<b>' + username + '</b>' + ' ' + message + '</li>')
            };
        };
      },
  });
};

get();

//Refresher
$('#refreshing').on('click', function(){
  get();
});

//Example message object
var message = {
  'username': window.location.search.slice(10),
  'text': 'text',
  'roomname': 'main'
}; 


//Format for POST
var post = function(){
    $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message');
      }
    });
};


//POST Button
var sendChat = function(){
    message.text = $('#yourMessage')[0].value;
    if (message.text.length){
        post();
        $('#yourMessage')[0].value = $('#yourMessage')[0].defaultValue;
    }
    get();

}
$('#submitText').on('click', function(){
    sendChat();
});

$(document).keypress(function(e){
    if(e.which === 13){
        sendChat();
    }
})

//sanitizes inputs
var tagBody = '(?:[^"\'>]|"[^"]*"|\'[^\']*\')*';

var tagOrComment = new RegExp(
    '<(?:'
    // Comment body.
    + '!--(?:(?:-*[^->])*--+|-?)'
    // Special "raw text" elements whose content should be elided.
    + '|script\\b' + tagBody + '>[\\s\\S]*?</script\\s*'
    + '|style\\b' + tagBody + '>[\\s\\S]*?</style\\s*'
    // Regular name
    + '|/?[a-z]'
    + tagBody
    + ')>',
    'gi');

var removeTags = function (html) {
  var oldHtml;
  do {
    oldHtml = html;
    (html) && (html = html.replace(tagOrComment, ''));
  } while (html !== oldHtml);
  return (html) && (html.replace(/</g, '&lt;'));
}

//Create A Room
$('#submitRoom').on('click', function(){
    $('#rooms').append('<button id=' + $('#createRoom').value + '>' + $('#createRoom').value +  '</button>');
});



$('body').on('click', 'button', function(){
    console.log(this);
})




