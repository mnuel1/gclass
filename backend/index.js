// const express = require("express");
// const app = express();
// const http = require('http');
// const cors = require("cors");
// const morgan = require("morgan");
// const path = require('path');
// const WebSocket = require('ws')
// const url = require('url');

// const uploadRoute = require("./src/Teacher/upload")
// const teacherRoute = require("./src/Teacher/routes/route");
// const studentRoute = require("./src/Student/routes/route")
// const adminRoute = require("./src/Admin/route")
// const searchRoute = require('./src/routes/route')

// const forgotPass = require('./src/notify')


// require("dotenv").config();

// app.use(morgan("tiny"));
// app.use(cors());
// app.use(express.json());
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// app.use(express.urlencoded({extended: true}))
// app.use("/teacher", teacherRoute)
// app.use("/student", studentRoute)
// app.use("/admin", adminRoute)
// app.use(uploadRoute)
// app.use(searchRoute)
// app.use(forgotPass)


// const classes = {};

// const server = http.createServer(app);



// const wss = new WebSocket.Server({ noServer: true });


// wss.on('connection', (ws, queryParams) => {
//   const role = queryParams.get('role');
//   const classId = queryParams.get('classId');
//   const studentId = queryParams.get('studentId');
//   const studentName = queryParams.get('studentName');


//   if (!classId) {
//     console.error('Class ID is missing!');
//     return;
//   }
        
//   if (!classes[classId]) {
//     classes[classId] = { teacherSocket: null, students: {} };
//   }

//   if (role === 'teacher') {
//     classes[classId].teacherSocket = ws;    
//   } else if (role === 'student') {
//     classes[classId].students[studentId] = 0;    
//     ws.on('message', (message) => {
            
//       const data = JSON.parse(message.toString());
//       const { action } = data;

//       if (action === 'increment') {        
//         classes[classId].students[studentId] += 1;        
//         if (classes[classId].students[studentId] === 3) {
//           const teacherSocket = classes[classId].teacherSocket;
//           if (teacherSocket && teacherSocket.readyState === WebSocket.OPEN) {
//             // Notify the teacher
//             teacherSocket.send(JSON.stringify({
//               type: 'absence_alert',
//               message: `${studentName} has been not detected 3 times.`,
//             }));
//           }
//         }
//       }
//     });
//   }

//   ws.on('close', () => {
//     if (role === 'teacher') {      
//       classes[classId].teacherSocket = null;
//     } else if (role === 'student') {      
//       delete classes[classId].students[studentId];
//     }
//   });
// });

// server.on('upgrade', (request, socket, head) => {
  
//   const parsedUrl = url.parse(request.url || '', true);
//   const queryParams = new URLSearchParams(parsedUrl.query);
  
//   wss.handleUpgrade(request, socket, head, (ws) => {
//     wss.emit('connection', ws, queryParams);
//   });
// });

// server.listen(process.env.PORT, () => {
//   console.log(`Server is running on http://localhost:${process.env.PORT}`);
// });


// const express = require("express");
// const app = express();
// const http = require('http');
// const cors = require("cors");
// const morgan = require("morgan");
// const path = require('path');
// const WebSocket = require('ws');
// const url = require('url');
// require("dotenv").config();

// app.use(morgan("tiny"));
// app.use(cors());
// app.use(express.json());
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use(express.urlencoded({ extended: true }));

// const server = http.createServer(app);
// const wss = new WebSocket.Server({ noServer: true });
// const classes = {};

// wss.on('connection', (ws, queryParams) => {
//   const role = queryParams.get('role');
//   const classId = queryParams.get('classId');
//   const userId = queryParams.get('userId');
//   const username = queryParams.get('username');

//   // Log the connection details
//   console.log(`New connection: 
//     Role: ${role}, 
//     Class ID: ${classId}, 
//     user ID: ${userId}, 
//     user Name: ${username}`);


//   if (!classId) {
//     console.error('Class ID is missing!');
//     return;
//   }

//   if (!classes[classId]) {
//     classes[classId] = { teacherSocket: null, students: {} };
//   }

//   if (role === 'teacher') {
//     classes[classId].teacherSocket = ws;
//   } else if (role === 'student') {
//     classes[classId].students[userId] = { socket: ws, absenceCount: 0 };
//   }

//   ws.on('message', (message) => {    
//     const data = JSON.parse(message.toString());
        
//     const teacherSocket = classes[classId].teacherSocket;
  
//     switch (data.type) {
//       case 'increment':
//         // Absence detection
//         classes[classId].students[userId].absenceCount += 1;
//         if (classes[classId].students[userId].absenceCount === 3 && teacherSocket && teacherSocket.readyState === WebSocket.OPEN) {
//           teacherSocket.send(JSON.stringify({
//             type: 'absence_alert',
//             message: `${username} has been not detected 3 times.`,
//           }));
//         }        
//         break;      
//       case 'chat':
//         // Broadcast chat message to everyone in the class
//         Object.values(classes[classId].students).forEach(student => {
//           if (student.socket.readyState === WebSocket.OPEN) {
//             student.socket.send(JSON.stringify({ type: 'chat', message: data.message, sender: username }));
//           }
//         });
//         if (teacherSocket && teacherSocket.readyState === WebSocket.OPEN) {
//           teacherSocket.send(JSON.stringify({ type: 'chat', message: data.message, sender: username }));
//         }
//         console.log("chat");
//         break;
//       case 'offer':
//       case 'answer':
//       case 'candidate':
//         const receiverSocket = role === 'teacher' 
//           ? classes[classId].students[data.receiverId]?.socket
//           : classes[classId].teacherSocket;
      
//         if (receiverSocket && receiverSocket.readyState === WebSocket.OPEN) {
//           receiverSocket.send(JSON.stringify(data));
//         }
//         break;
          
  
   
  
      
//     }
//   });
  

//   ws.on('close', () => {
//     if (role === 'teacher') {
//       classes[classId].teacherSocket = null;
//       console.log("teacher disconnects");
      
//     } else if (role === 'student') {
//       console.log("student disconnects");
//       delete classes[classId].students[userId];
//     }
//   });
// });

// server.on('upgrade', (request, socket, head) => {
//   const parsedUrl = url.parse(request.url || '', true);
//   const queryParams = new URLSearchParams(parsedUrl.query);

//   wss.handleUpgrade(request, socket, head, (ws) => {
//     wss.emit('connection', ws, queryParams);
//   });
// });

// server.listen(process.env.PORT, () => {
//   console.log(`Server is running on http://localhost:${process.env.PORT}`);
// });


// const express = require('express');
// const http = require('http');
// const WebSocket = require('ws');
// const path = require('path');

// const app = express();
// const server = http.createServer(app);
// const wss = new WebSocket.Server({ server });
// const PORT = process.env.PORT || 3001;

// let socketList = {};
// let rooms = {}; // To manage room memberships

// // Route
// app.get('/ping', (req, res) => {
//   res.status(200).send({ success: true });
// });

// // WebSocket connection
// wss.on('connection', (ws) => {
//   console.log('New User connected');

//   ws.on('message', (data) => {
//     const message = JSON.parse(data);
//     const { type, payload } = message;

//     switch (type) {
//       case 'BE-check-user':
//         handleCheckUser(ws, payload);
//         break;
//       case 'BE-join-room':
//         handleJoinRoom(ws, payload);
//         break;
//       case 'BE-call-user':
//         handleCallUser(ws, payload);
//         break;
//       case 'BE-accept-call':
//         handleAcceptCall(ws, payload);
//         break;
//       case 'BE-send-message':
//         handleSendMessage(ws, payload);
//         break;
//       case 'BE-leave-room':
//         handleLeaveRoom(ws, payload);
//         break;
//       case 'BE-toggle-camera-audio':
//         handleToggleCameraAudio(ws, payload);
//         break;
//       default:
//         console.log('Unknown message type:', type);
//     }
//   });

//   ws.on('close', () => {
//     handleDisconnect(ws);
//     console.log('User disconnected');
//   });
// });

// function handleCheckUser(ws, { roomId, userName }) {
//   const room = rooms[roomId] || [];
//   const userExists = room.some((user) => user.userName === userName);
//   ws.send(JSON.stringify({ type: 'FE-error-user-exist', payload: { error: userExists } }));
// }

// function handleJoinRoom(ws, { roomId, userName }) {
//   if (!rooms[roomId]) rooms[roomId] = [];
//   const userId = ws._socket.remotePort; // Use remotePort as unique userId
//   const user = { userId, userName, video: true, audio: true };

//   rooms[roomId].push(user);
//   socketList[userId] = ws;

//   const users = rooms[roomId];
//   broadcastToRoom(roomId, {
//     type: 'FE-user-join',
//     payload: users,
//   });
// }

// function handleCallUser(ws, { userToCall, from, signal }) {
//   const targetSocket = socketList[userToCall];
//   if (targetSocket) {
//     targetSocket.send(JSON.stringify({
//       type: 'FE-receive-call',
//       payload: { signal, from, info: socketList[ws._socket.remotePort] },
//     }));
//   }
// }

// function handleAcceptCall(ws, { signal, to }) {
//   const targetSocket = socketList[to];
//   if (targetSocket) {
//     targetSocket.send(JSON.stringify({
//       type: 'FE-call-accepted',
//       payload: { signal, answerId: ws._socket.remotePort },
//     }));
//   }
// }

// function handleSendMessage(ws, { roomId, msg, sender }) {
//   broadcastToRoom(roomId, {
//     type: 'FE-receive-message',
//     payload: { msg, sender },
//   });
// }

// function handleLeaveRoom(ws, { roomId, leaver }) {
//   const userId = ws._socket.remotePort;
//   delete socketList[userId];

//   if (rooms[roomId]) {
//     rooms[roomId] = rooms[roomId].filter((user) => user.userId !== userId);
//     broadcastToRoom(roomId, {
//       type: 'FE-user-leave',
//       payload: { userId, userName: leaver },
//     });
//   }
// }

// function handleToggleCameraAudio(ws, { roomId, switchTarget }) {
//   const userId = ws._socket.remotePort;
//   const room = rooms[roomId];

//   if (room) {
//     const user = room.find((user) => user.userId === userId);
//     if (user) {
//       if (switchTarget === 'video') user.video = !user.video;
//       if (switchTarget === 'audio') user.audio = !user.audio;

//       broadcastToRoom(roomId, {
//         type: 'FE-toggle-camera',
//         payload: { userId, switchTarget },
//       });
//     }
//   }
// }

// function handleDisconnect(ws) {
//   const userId = ws._socket.remotePort;
//   delete socketList[userId];

//   Object.keys(rooms).forEach((roomId) => {
//     rooms[roomId] = rooms[roomId].filter((user) => user.userId !== userId);
//     broadcastToRoom(roomId, {
//       type: 'FE-user-leave',
//       payload: { userId, userName: null },
//     });
//   });
// }

// function broadcastToRoom(roomId, message) {
//   const room = rooms[roomId];
//   if (room) {
//     room.forEach((user) => {
//       const ws = socketList[user.userId];
//       if (ws) ws.send(JSON.stringify(message));
//     });
//   }
// }

// server.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

require("dotenv").config();

const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: "*", // Allow all origins for testing, adjust as needed
    methods: ["GET", "POST"]
  }
});
const PORT = 4000;
const path = require('path');

let socketList = {};

app.use(express.static(path.join(__dirname, 'public')));

// Route
app.get('/ping', (req, res) => {
  res
    .send({
      success: true,
    })
    .status(200);
});
const logRoomParticipants = async (roomId) => {
  const clients = await io.in(roomId).fetchSockets();
  console.log(`Participants in room "${roomId}":`);
  clients.forEach((client) => {
    const userInfo = socketList[client.id];
    console.log(`- User ID: ${client.id}, User Info: ${JSON.stringify(userInfo)}`);
  });
};
// Socket
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

http.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// const wss = new WebSocket.Server({ server });

// wss.on('connection', (ws, request) => {
//   const parsedUrl = url.parse(request.url || '', true);
//   const queryParams = new URLSearchParams(parsedUrl.query);  // Convert query object to URLSearchParams

//   console.log(`New WebSocket connection: ${queryParams.toString()}`);
//   const role = queryParams.get('role');
//   const classId = queryParams.get('classId');
//   const studentId = queryParams.get('studentId');
//   const studentName = queryParams.get('studentName');

//   if (!classId) {
//     console.error('Class ID is missing!');
//     return;
//   }

//   if (!classes[classId]) {
//     classes[classId] = { teacherSocket: null, students: {} };
//   }

//   if (role === 'teacher') {
//     classes[classId].teacherSocket = ws;
//   } else if (role === 'student') {
//     classes[classId].students[studentId] = 0;
//     ws.on('message', (message) => {
//       const data = JSON.parse(message.toString());
//       const { action } = data;

//       if (action === 'increment') {
        
//         classes[classId].students[studentId] += 1;
//         if (classes[classId].students[studentId] === 3) {
//           const teacherSocket = classes[classId].teacherSocket;
//           if (teacherSocket && teacherSocket.readyState === WebSocket.OPEN) {
//             // Notify the teacher
//             teacherSocket.send(JSON.stringify({
//               type: 'absence_alert',
//               message: `${studentName} has been not detected 3 times.`,
//             }));
	    
//           }
//         }
//       }
//     });
//   }

//   ws.on('close', () => {
//     if (role === 'teacher') {
//       classes[classId].teacherSocket = null;
//     } else if (role === 'student') {
//       delete classes[classId].students[studentId];
//     }
//   });
// });
