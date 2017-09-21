var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var express = require('express')
var axios = require('axios')

io.on('connection', function(socket){
    socket.on('chat',function(user,msg){
        console.log(user + 'said:' + msg);

        if(/Siri/.test(msg)){
            axios.post('http:www.tuling123.com/openapi/api',{
                key: '3f7c89c85c9142639f0c1eab94c4f11f',
                info: msg,
                userid: user
            }.then(function(res){
                console.log(res.data)
                io.sockets.emit('chat',{name:'Siri', msg:res.data.text})
              })
        )}
        socket.broadcast.emit('chat', user + 'said:' + msg)
    })
})

app.use(express.static('./public'))
http.listen(3000,function(){
    console.log('listening on 3000')
})