const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

// const { setupWebSocket } = require("./src/websocket/websocket");

const teacherRoute = require("./src/Teacher/routes/route");
const searchRoute = require('./src/routes/route')

require("dotenv").config();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({extended: true}))
app.use("/teacher", teacherRoute)
app.use(searchRoute)



const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

// app.get("/", (req, res) => {
//   res.send("WebSocket server is running");
// });

// setupWebSocket(server);
