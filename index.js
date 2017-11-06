require('./config.js');
var express = require('express');
var app = express();
const client = require('twilio')(process.env.TWILIO_ID, process.env.TWILIO_AUTH_TOKEN);
var MessagingResponse = require('twilio').twiml.MessagingResponse;

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.post('/sms', (req, res) => {
  // const twiml = new MessagingResponse();

  //twiml.message('The Robots are coming! Head for the hills!');

  res.end();
  //res.writeHead(200, {'Content-Type': 'text/xml'});
  //res.end(twiml.toString());
});

// client.messages('SMddbdc5788a9a18af11ff210da1156a2d')
//   .fetch()
//   .then(function(message){
//     console.log(message.body);
//   } 
// );

// client.messages.each(function(message){
//   console.log(message.body);
// });

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});