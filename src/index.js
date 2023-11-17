const express = require('express');
const app = express();
const cors = require('cors');
const { createServer } = require('http');
const { Server } = require('socket.io');

app.use(cors());

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
  },
});

io.on('connection', (socket) => {
  console.log('connected to ', socket.id);

  socket.on('join_room', (data) => {
    socket.join(data);
    console.log('User connected to room', data);

    socket.on('send_message', (data) => {
      socket.to(data.room).emit('receive_message', data);
    });
    socket.on('disconnet', () => {
      console.log('user disconneted', socket.id);
    });
  });
});

server.listen(3030, () => {
  console.log('Server is running on port 3030');
});
