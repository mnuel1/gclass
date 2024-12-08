const express = require("express");
const app = express();
const http = require('http');
const https = require('https');
const cors = require("cors");
const morgan = require("morgan");
const path = require('path');
const WebSocket = require('ws')
const url = require('url');
const fs = require('fs');

const uploadRoute = require("./src/Teacher/upload")
const teacherRoute = require("./src/Teacher/routes/route");
const studentRoute = require("./src/Student/routes/route")
const adminRoute = require("./src/Admin/route")
const searchRoute = require('./src/routes/route')
const postRoute = require('./src/PostFeature/routes/route')

const forgotPass = require('./src/notify')


require("dotenv").config();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.urlencoded({ extended: true }))
app.use("/teacher", teacherRoute)
app.use("/student", studentRoute)
app.use("/admin", adminRoute)
app.use('/class', postRoute)
app.use(uploadRoute)
app.use(searchRoute)
app.use(forgotPass)


const classes = {};
let socketList = {};
const server = http.createServer(app);
const io = require('socket.io')(server , {
  cors: {
    origin: "*", // Allow all origins for testing, adjust as needed
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log(`New User connected: ${socket.id}`);
    
  socket.on('disconnect', () => {
    console.log('User disconnected!');
    // Clean up socketList on disconnect
    delete socketList[socket.id];
  });

  socket.on('BE-check-user', ({ roomId, userName }) => {
    let error = false;
        
    // Use fetchSockets instead of clients()
    io.in(roomId).fetchSockets().then((clients) => {
      clients.forEach((client) => {
        if (socketList[client.id] === userName) {
          error = true;
        }
      });
      socket.emit('FE-error-user-exist', { error });
    });
  });

  /**
   * Join Room
   */
  socket.on("BE-student-increment", async ({ roomId }) => {
    
    const socketId = socket.id
    if (socketList[socketId]) {
    
      const userRole = socketList[socketId].role;
      // console.log(userRole);
      
      const user = socketList[socketId].userName;
      if (userRole === 'student') {          
          socketList[socketId].count += 1;
          if (socketList[socketId].count === 3) {
            socket.broadcast.to(roomId).emit('FE-teacher-notify', 
              { msg: `${user} has been not detected 3 times.` }
            );                        
          }
          // console.log(`Count for student with ID ${socketId} incremented to ${socketList[socketId].count}`);
      } else {
          console.log(`Role is not 'student' for socket ID ${socketId}.`);
      }
  } else {
      console.log(`Socket ID ${socketId} not found in socketList.`);
  }

  }) 
  socket.on('BE-join-room',async  ({ roomId, userName, role }) => {
    console.log(`new user join`);

    // Socket Join RoomName
    socket.join(roomId);
    socketList[socket.id] = { 
      userName, 
      video: true, 
      audio: true, 
      role: role, 
      count: 0 
    };

    console.log(`New User joined: ${userName} role: ${role}`);
    // await logRoomParticipants(roomId);

    // Set User List
    io.in(roomId).fetchSockets().then((clients) => {
      try {
        const users = [];
        clients.forEach((client) => {
          // Add User List
          users.push({ userId: client.id, info: socketList[client.id] });
        });
        socket.broadcast.to(roomId).emit('FE-user-join', users);
      } catch (e) {
        io.in(roomId).emit('FE-error-user-exist', { err: true });
      }
    });
  });

  socket.on('BE-call-user', ({ userToCall, from, signal }) => {
    io.to(userToCall).emit('FE-receive-call', {
      signal,
      from,
      info: socketList[socket.id],
    });
  });

  socket.on('BE-accept-call', ({ signal, to }) => {
    io.to(to).emit('FE-call-accepted', {
      signal,
      answerId: socket.id,
    });
  });

  socket.on('BE-send-message', ({ roomId, msg, sender }) => {
    io.in(roomId).emit('FE-receive-message', { msg, sender });
  });

  socket.on('BE-leave-room', ({ roomId, leaver }) => {
    delete socketList[socket.id];
    socket.broadcast.to(roomId).emit('FE-user-leave', { userId: socket.id, userName: [socket.id] });
    socket.leave(roomId);  // Correct way to leave the room in v3.x
  });

  socket.on('BE-toggle-camera-audio', ({ roomId, switchTarget }) => {
    if (switchTarget === 'video') {
      socketList[socket.id].video = !socketList[socket.id].video;
    } else {
      socketList[socket.id].audio = !socketList[socket.id].audio;
    }
    socket.broadcast.to(roomId).emit('FE-toggle-camera', { userId: socket.id, switchTarget });
  });
});


server.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

