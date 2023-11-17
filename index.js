const express = require('express');
const app = express();
const cors = require('cors');
const {createServer} = require('http');
const {Server} = require('socket.io');

app.use(cors());

const server = createServer(app);

const corsOptions = {
  origin: '*',
};
app.use(cors(corsOptions));
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
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
    socket.on('disconnect', () => {
      console.log('user disconneted', socket.id);
    });
  });
});

server.listen(3030, () => {
  console.log('Server is running on port 3030');
});


chat-app-client-os2u9ij73-vinays-projects-dae81526.vercel.app/:1 Access to XMLHttpRequest at 'https://chat-app-plod.onrender.com/socket.io/?EIO=4&transport=polling&t=OlSpBiC' from origin 'https://chat-app-client-os2u9ij73-vinays-projects-dae81526.vercel.app' has been blocked by CORS policy: The 'Access-Control-Allow-Origin' header has a value 'https://chat-app-clien-murex.vercel.app' that is not equal to the supplied origin.