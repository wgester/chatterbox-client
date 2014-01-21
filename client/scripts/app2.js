var Message = Backbone.Model.extend({
 
});

var messages = new Message({});


var get = function(){
  $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
      data: {'order' : '-createdAt'},
      success: function(data){
        $('#allMessages').text('');
        for (var i = 0; i < data.results.length; i++){
            data.results[i]['roomname'] = removeTags(data.results[i]['roomname']);
            data.results[i]['username'] = removeTags(data.results[i]['username']);
            data.results[i]['text'] = removeTags(data.results[i]['text']);
            messages.set(data.results[i].createdAt, data.results[i]);
        }
    }
  });
};

get();


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

// user model, submitting messages

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
