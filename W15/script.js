const http = require('http');
const fs = require('fs')
const path = require('path')

const server = http.createServer((req,res)=>{
    if(req.url === '/api/products' && req.method === 'GET'){
        fs.readFile(path.join(__dirname,'products.json'),'utf-8',(err,data)=>{
            if(err){
                res.writeHead(500);
                res.end("Server Error");
                return;
            }
            res.writeHead(200,{
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin':'*'
            });
            res.end(data);
        });
    }
    else{
        res.writeHead(404,{'Content-Type':'text/plain'});
        res.end("Not found")
    }
});

server.listen(3000,()=>{
    console.log("Server running on port 3000");
});