var Message = Backbone.Model.extend({
 
});

var MessageCollection = Backbone.Collection.extend({
    model: Message
});
   
var messageCollection = new MessageCollection({}); 

var get = function(){
  $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
      data: {'order' : '-createdAt'},
      success: function(data){
        $('#allMessages').text('');
        for (var i = 0; i < data.results.length; i++){
            var message = new Message({});
            message.set({
                'roomname' : removeTags(data.results[i]['roomname']),
                'username' : removeTags(data.results[i]['username']),
                'text' : removeTags(data.results[i]['text'])
            });
            messageCollection.add(message);
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
