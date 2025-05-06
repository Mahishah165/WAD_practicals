const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathParts = parsedUrl.pathname.split('/');

  // GET all users
  if (req.url === '/api/users' && req.method === 'GET') {
    fs.readFile(path.join(__dirname, 'users.json'), 'utf-8', (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Server Error');
        return;
      }
      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      res.end(data);
    });

  // GET user by ID: /api/users/2
  } else if (pathParts[1] === 'api' && pathParts[2] === 'users' && pathParts[3] && req.method === 'GET') {
    const userId = parseInt(pathParts[3]);

    fs.readFile(path.join(__dirname, 'users.json'), 'utf-8', (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Server Error');
        return;
      }

      const users = JSON.parse(data);
      const user = users.find(u => u.id === userId);

      if (user) {
        res.writeHead(200, {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        });
        res.end(JSON.stringify(user));
      } else {
        res.writeHead(404, {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        });
        res.end(JSON.stringify({ message: 'User not found' }));
      }
    });

  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end("Not found");
  }
});

server.listen(3001, () => {
  console.log("Server running on port 3001");
});
