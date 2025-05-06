const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  if (req.url === '/api/employees' && req.method === 'GET') {
    fs.readFile(path.join(__dirname, 'employees.json'), 'utf-8', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end('Server Error');
        return;
      }
      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      res.end(data);
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
