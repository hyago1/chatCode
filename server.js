// server.js

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
app.use(express.static('public'));


const server = http.createServer(app);

// 1. Inicializa o Socket.IO e o anexa ao servidor HTTP
const io = new Server(server);

// Define a rota base para servir o arquivo do cliente (index.html)
// Use __dirname para garantir que o caminho seja correto
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/chat', (req, res) => {
  res.sendFile(__dirname + '/chat.html');
});

// 2. Lógica Principal: Escuta Novas Conexões
io.on('connection', (socket) => {
  console.log('Um usuário conectado com o ID:', socket.id);

  // Exemplo de como escutar um evento vindo do cliente
  socket.on('join_room', (roomName) => {
    // O Servidor executa o método de entrar na Room
    socket.join(roomName);
    console.log(`Usuário ${socket.id} entrou na sala: ${roomName}`);

    // Envia uma confirmação (e mensagem de boas-vindas) APENAS para aquela Room
    io.to(roomName).emit('status_message', `Bem-vindo(a) à sala: ${roomName}!`);
  });

  // Exemplo de como processar uma mensagem e retransmitir para uma Room
  socket.on('send_message', (data) => {
    const roomName = 'chat_geral'; // Exemplo de Room
    console.log(data);

    // Retransmite a mensagem para todos DENTRO da 'chat_geral'
    io.to(data.sala).emit('new_message', data);
  });

  // Lida com a desconexão
  socket.on('disconnect', () => {
    console.log('Usuário desconectado');
  });
});

// 3. Inicia o Servidor na porta 3000
server.listen(3000, () => {
  console.log('Servidor Socket.IO rodando em http://localhost:3000');
});