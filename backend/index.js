const express = require("express");
const app = express();
const http = require('http');
const cors = require("cors");
const morgan = require("morgan");
const path = require('path');
const WebSocket = require('ws')
const url = require('url');

const uploadRoute = require("./src/Teacher/upload")
const teacherRoute = require("./src/Teacher/routes/route");
const studentRoute = require("./src/Student/routes/route")

const searchRoute = require('./src/routes/route')



require("dotenv").config();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.urlencoded({extended: true}))
app.use("/teacher", teacherRoute)
app.use("/student", studentRoute)
app.use(uploadRoute)
app.use(searchRoute)



const classes = {};

const server = http.createServer(app);



const wss = new WebSocket.Server({ noServer: true });


wss.on('connection', (ws, queryParams) => {
  const role = queryParams.get('role');
  const classId = queryParams.get('classId');
  const studentId = queryParams.get('studentId');
  const studentName = queryParams.get('studentName');


  if (!classId) {
    console.error('Class ID is missing!');
    return;
  }
        
  if (!classes[classId]) {
    classes[classId] = { teacherSocket: null, students: {} };
  }

  if (role === 'teacher') {
    classes[classId].teacherSocket = ws;    
  } else if (role === 'student') {
    classes[classId].students[studentId] = 0;    
    ws.on('message', (message) => {
            
      const data = JSON.parse(message.toString());
      const { action } = data;

      if (action === 'increment') {        
        classes[classId].students[studentId] += 1;        
        if (classes[classId].students[studentId] === 3) {
          const teacherSocket = classes[classId].teacherSocket;
          if (teacherSocket && teacherSocket.readyState === WebSocket.OPEN) {
            // Notify the teacher
            teacherSocket.send(JSON.stringify({
              type: 'absence_alert',
              message: `${studentName} has been not detected 3 times.`,
            }));
          }
        }
      }
    });
  }

  ws.on('close', () => {
    if (role === 'teacher') {      
      classes[classId].teacherSocket = null;
    } else if (role === 'student') {      
      delete classes[classId].students[studentId];
    }
  });
});

server.on('upgrade', (request, socket, head) => {
  
  const parsedUrl = url.parse(request.url || '', true);
  const queryParams = new URLSearchParams(parsedUrl.query);
  
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, queryParams);
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});