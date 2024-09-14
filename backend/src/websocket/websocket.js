// const WebSocket = require('ws');
// const { GetNewOrders } = require('../controllers/Orders/order');

// function setupWebSocket(server) {
//     const wss = new WebSocket.Server({ noServer: true });

//     wss.on('connection', ws => {
//         console.log('Client connected');
        
//         sendLatestOrder(ws);

//         const intervalId = setInterval(() => {
//             sendLatestOrder(ws);
//             // sendLatestPaymentPending(ws)
//         }, 5000);
    
//         ws.on('close', () => {
//             clearInterval(intervalId);
//             console.log('Client disconnected');
//         });
//     });


//     server.on('upgrade', (request, socket, head) => {
//         wss.handleUpgrade(request, socket, head, ws => {
//             wss.emit('connection', ws, request);
//         });
//     });
// }

// async function sendLatestOrder(ws) {
//     try {
//         const orders = await GetNewOrders();
//         if (orders.length > 0) {
//             // console.log(orders);
            
//             ws.send(JSON.stringify(orders));
//         }
//     } catch (err) {
//         console.error('Error fetching orders:', err);
//     }
// }

// async function sendLatestPaymentPending (ws) {
//     try {
//         const pendingPayment = await GetPendingPayment();
//         if (orders.length > 0) {
//             // console.log(orders);
            
//             ws.send(JSON.stringify(pendingPayment));
//         }
//     } catch (err) {
//         console.error('Error fetching orders:', err);
//     }
// }


// module.exports = {
//     setupWebSocket,
// };
