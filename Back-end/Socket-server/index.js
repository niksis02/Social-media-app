const io = require("socket.io")(5001, {
    cors: {
      origin: "http://localhost:3000",
    },
});

let users = [];

const addUser = (userId, socketId) => {
    !users.some(user => user.userId === userId) && 
    users.push({userId, socketId});
}

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId);
}

const getUser = userId => {
    return users.find(user => user.userId === userId);
}

io.on('connection', socket => {
    console.log('New user connected');

    socket.on('addUser', userId => {
        addUser(userId, socket.id);
        io.emit('getUsers', users);
    });

    socket.on('sendMessage', message => {
        const user = getUser(message.receiverId);

        console.log(message);
        io.to(user.socketId).emit('getMessage', message);
    })

    socket.on('disconnect', () => {
        console.log('a user disconnected');
        removeUser(socket.id);
        io.emit('getUsers', users);
    });
})
  
  