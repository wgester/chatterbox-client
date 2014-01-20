$.ajax({
  url: 'https://api.parse.com/1/classes/chatterbox',
  data: {'order' : '-createdAt'},
  success: function(data){
    for (var i = 0; i < data.results.length; i++){
        var username = removeTags(data.results[i]['username']);
        var message = removeTags(data.results[i]['text']);
        console.log(username, message);
        $('#allMessages').append('<li>' + username + '</li>' + '<li>' + message + '</li>')
    };
  },
});

var message = {
  'username': 'shawndrost',
  'text': 'trololo',
  'roomname': '4chan'
};

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
    html = html.replace(tagOrComment, '');
  } while (html !== oldHtml);
  return html.replace(/</g, '&lt;');
}