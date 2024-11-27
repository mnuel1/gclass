// import io, { Socket } from 'socket.io-client';

// const sockets: Socket = io('http://localhost:4000'); 

// export default sockets;

import io, { Socket } from 'socket.io-client';

// Define the socket instance and its types
const socket: Socket = io('http://localhost:4000', {
  transports: ['websocket'], // Force WebSocket transport for better stability
  autoConnect: true, // Make sure socket tries to auto connect
});
export default socket;

