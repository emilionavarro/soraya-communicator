require('./config.js');
var express = require('express');
var app = express();
var client = require('twilio')(process.env.TWILIO_ID, process.env.TWILIO_AUTH_TOKEN);
var MessagingResponse = require('twilio').twiml.MessagingResponse;
var MongoClient = require('mongodb').MongoClient;
var DB = void 0;

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

//GET REQUESTS-----------------------------
app.get('/', function(request, response) {
  response.render('pages/index');
});
//-----------------------------------------

//POST REQUESTS----------------------------
app.post('/sms', (req, res) => {
  // const twiml = new MessagingResponse();
  //twiml.message('The Robots are coming! Head for the hills!');
  handleNewMessage();
  res.end();
  //res.writeHead(200, {'Content-Type': 'text/xml'});
  //res.end(twiml.toString());
});
//-----------------------------------------

function handleNewMessage() {
  var collection = DB.collection('onboards');
  
  getLastMessage(message => {
    console.log(lastMessage.body);
  });

}

function getLastMessage(callback) {
  var today = new Date();
  
  var filterOpts = {
    dateSent: new Date(today.getFullYear(), today.getMonth(), today.getDate())
  };

  client.messages.list(filterOpts, function(err, data) {
    // data.forEach(function(message) {
    //   console.log(message.body);
    // });
    if (data.length > 0) {
      callback(data[0]);
    } else {
      return null;
    }
  });
}

function startup() {
  openConnection(db => {
    DB = db;
    afterStartup();
  });
}

function afterStartup() {
  console.log("app has started.")
}

function openConnection(callback) {
  var url = process.env.MONGODB_CONNECTION;
  
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log("Database created!");
    if (callback)
      callback(db);
  });
};

function closeDBConnection() {
  DB.close();
};

startup();


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