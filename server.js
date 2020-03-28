const port = 80;
const express = require('express')
const io = require('socket.io')(3000)

/**
 * Application
 */
const applicatoin = new express()
applicatoin.listen(port, () => {
    console.log('--------------------------------');
    console.log(`Server is running on port ${port}`);
    console.log('--------------------------------');
})
applicatoin.use(express.static('public'))

/**
 * Socket
 */
var users = []
io.on('connection', socket => {
    let id = socket.id

    socket.emit('id', id);
    socket.on('register', player => {
        player.id = id
        users[id] = player;

        socket.emit('otherList', Object.values(users).filter(item => item.id != id));
        socket.broadcast.emit('registered', player)
        
        console.log(`${Object.values(users).length} Players Online`)
    })
    socket.on('move', player => {
        users[id].x = player.x
        users[id].y = player.y

        socket.broadcast.emit('moved', {id, x: player.x, y: player.y})
    })
    socket.on('disconnect', () => {
        socket.broadcast.emit('disconnected', id)
        delete users[id]

        console.log(`${Object.values(users).length} Players Online`)
    })
})