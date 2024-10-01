const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const path = require('path');

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



app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);  
});

const clients = [];

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('A user connected');

  ws.on('message', (message) => {
    const data = JSON.parse(message);
    if (data.type === 'register') {
      clients.push({ id: data.id, role: data.role, socket: ws });
      console.log(`User registered: ${data.id} as ${data.role}`);
    }
  });

  ws.on('close', () => {
    console.log('User disconnected');
    // Remove client from the array
    clients.splice(clients.indexOf(ws), 1);
  });
});


app.post('/notify', (req, res) => {
  const { message, studentId } = req.body;
  console.log(message); // Log the message on the server

  // Find the teacher and send the notification to them only
  const teacher = clients.find(client => client.role === 'teacher');
  if (teacher && teacher.socket.readyState === WebSocket.OPEN) {
    teacher.socket.send(JSON.stringify({ message: `${studentId} is not present!` }));
  }

  return res.status(200).json({ status: 'Notification sent.' });
});

// useEffect(() => {
//   // Connect to WebSocket server
//   const webSocket = new WebSocket('ws://localhost:5000');

//   webSocket.onmessage = (event) => {
//     const data = JSON.parse(event.data);
//     setNotifications((prev) => [...prev, data.message]);
//   };

//   // Register the user (teacher or student) with the server
//   webSocket.onopen = () => {
//     webSocket.send(JSON.stringify({ type: 'register', id: studentId, role }));
//   };

//   setWs(webSocket);

//   // Cleanup function to close the WebSocket connection when the component unmounts
//   return () => {
//     webSocket.close();
//   };
// }, [role, studentId]);