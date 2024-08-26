const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const bodyParser = require('body-parser');
const cors = require('cors');

const DataAccessObject = require('./dataAccessObject');
const Comment = require('./comment');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const dataAccessObject = new DataAccessObject('./database.sqlite3');
const comment = new Comment(dataAccessObject);

comment.createTable().catch(error => {
  console.log(`Error: ${JSON.stringify(error)}`);
});


app.use(express.json());


wss.on('connection', (ws) => {
  console.log('New client connected');

  ws.on('message', async (message) => {
    const newComment = JSON.parse(message);
    //  Broadcast the new comment to all clients
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(newComment));
        }
      });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

app.post('/createComment', function(request, response) {
  const { body } = request;
  comment.createComment(body).then(result => {
    response.send(result);
  });
});

app.get('/getComments', function(request, response) {
  comment.getComments().then(result => {
    response.send(result);
  });
});

app.delete('/deleteComments', function(request, response) {
  comment.deleteComments().then(result => {
    response.send(result);
  });
});

app.get('/getComment', function(request, response) {
  const { body } = request;
  const { id } = body;
  comment.getComment(id).then(result => {
    response.send(result);
  });
});

server.listen(3001, () => {
  console.log('Server is listening on port 3001');
});