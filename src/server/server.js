var express = require('express');
var socket = require('socket.io');

var app = express();

var PORT = process.env.PORT || 8000;
var server = app.listen(PORT, function(){
    console.log('server is running on port ' + PORT);
});

var io = socket(server);

var usersList = [];

io.on('connection', (socket) => {

    socket.on('SEND_MESSAGE', function(data){
        //Let every user know of the new message
        io.emit('RECEIVE_MESSAGE', data);
    });

    socket.on('ENTER_LOBBY', function(data){
        //Add user to usersList, and let every user know of the current usersList
        usersList.push(data);
        console.log(data);
        io.emit('ENTER_LOBBY', usersList);
    });

    socket.on('EXIT_LOBBY', function(data){
        //Remove user from usersList, and let every user know of the current usersList
        var index = usersList.findIndex(user => user.username===data.username);
        if (index > -1) {
          usersList.splice(index, 1);
        }
        io.emit('EXIT_LOBBY', usersList);
    });

    socket.on('DRAWING', function(data) {
        //Let every user know of the current drawing data, except current user who is drawing
        socket.broadcast.emit('DRAWING', data);
    });   

});
