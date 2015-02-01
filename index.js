
//Declare libs
var http = require('http');
var socketIO = require('socket.io');
var express = require('express');
var fileReader = require('fs');

//Declare variables
var pg = require('pg');
var port = process.env.PORT || 5000;
var ip = process.env.IP || '127.0.0.1';
var welcomePage = fileReader.readFileSync('template/welcomePage.html');

//create new server with express
var app = express();
//var server;
//var io;

//Define node variable
app.set('port', port);
app.set('ip', ip);

app.use(express.static(__dirname + '/public'));

server = http.createServer(app).listen(app.get('port'), app.get('ip'), function () {

    console.log("Express app is running at localhost:" + app.get('port'));

});

io = socketIO.listen(server);

io.on('connection', function(socket){
    socket.emit('firstMessage', {hello : 'Change the world'});

    socket.on('user-join', function (data) {
        console.log('User '+data+ ' has connected!');
        socket.broadcast.emit('new-user', data);
    });
});

io.set('origins', '*:*');

//ACTION default action when access page
app.get('/', function(request, response) {
    console.log('Return HTML Page');
    response.writeHead(200, {'Content-Type' : 'text/html'});
    response.end(welcomePage);
});


app.get('/products/', function (request, response) {
    response.writeHead(200, {ContentType : 'text/json'});
    response.write(JSON.stringify([{id : 1}, {id : 2}]));
    response.end();
});
//app.get('/db', function (request, response) {
//    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
//        client.query('SELECT * FROM test_table', function(err, result) {
//            done();
//            if (err)
//            { console.error(err); response.send("Error " + err); }
//            else
//            { response.send(result.rows); }
//        });
//    });
//});

