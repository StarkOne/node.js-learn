const WebSocket = require('ws');

const server = new WebSocket.server({ port: 3000 });

server.on('connection', ws => {
  ws.send('Добро пожаловать');
})