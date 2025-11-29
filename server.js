const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const PORT = 3000;

// creat server
const server = http.createServer(async(req, res)=>{
    console.log(`Request for ${req.url}`);
    let filePath = '';
    let statusCode = 200;

    switch(req.url){
        case '/':
        case '/home':
            filePath = path.join(__dirname,'Pages','home.html');
            break;
         case '/about':
            filePath = path.join(__dirname,'Pages','about.html');
            break;
         case '/contact':
            filePath = path.join(__dirname,'Pages','contact.html');
            break;
         default:
            filePath = path.join(__dirname,'Pages','404.html');
            statusCode = 404;
    }
    try{
        const data = await fs.readFile(filePath);
        res.writeHead(statusCode,{'Content-Type': 'text/html'});
        res.end(data);
    }catch(err){
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Internal Server Error');
    }
});

server.listen(PORT,()=>{
    console.log(`Server running at http://localhost:${PORT}/home`);
    
})