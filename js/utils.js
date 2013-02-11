// utility function for setting authentication headers.
// use it like this: 
// $.ajax(url, {
//   ...,
//   beforeSend: headerSetter
// })
var headerSetter = function(xhr) {
  xhr.setRequestHeader("X-Parse-Application-Id", "voLazbq9nXuZuos9hsmprUz7JwM2N0asnPnUcI7r");
  xhr.setRequestHeader("X-Parse-REST-API-Key", "QC2F43aSAghM97XidJw8Qiy1NXlpL5LR45rhAVAf");
}

var message = {
  "username": "",
  "text": ""
}

var drawMessages = function(data){
  var messages = JSON.parse(data);
  var $html = $("#main").html("");
  _.each(messages, function(message){
    $html.append('<br>' + message["username"] + ": " + message["text"]);
  });
};

var serverSubmit = function () {
  $.ajax("http://127.0.0.1:9000/1/classes/messages", {
    contentType: "application/json",
    type: 'POST',
    data: JSON.stringify(message),
    success: function (result) {
      serverGet();
    }
  }); 
};

var serverGet = function () {
  $.ajax("http://127.0.0.1:9000/1/classes/messages", {
    contentType: "application/json",
    success: function(data){
      drawMessages(data);
    }
  });
};

$(document).ready(function(){
  serverGet();
});

// the problem is that parse.com only returns 100 of the objects, the first 100.  so you need to add a parameter to the url that lets it know that you want all the messages after message number X, like this would find all the messages after message number 300.            https://api.parse.com/1/classes/messages?skip=300
  


$("#submitUser").click(function (){
  //store the textarea data in JSON
  var usernameInput = $("#username").val();
  message.username = usernameInput;
  //call the function that does the AJAX to put the info on the server
});

$("#submitChat").click(function (){
  //store the textarea data in JSON
  var textInput = $("#chatArea").val();
  message.text = textInput;
  serverSubmit();
  //call the function that does the AJAX to put the info on the server
});


