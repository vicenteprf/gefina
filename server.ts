import http from 'node:http';

http.createServer((req, res) => {
    if(req.url !== '/api/health') {
    res.writeHead(404, {'content-type': 'application/json'});
    res.end(JSON.stringify({ message: 'Recurso não encontrado.'}));  
    return;  
    }

    res.writeHead(200, {'content-type': 'application/json'});
    res.end(JSON.stringify({ status: 'ok'}));
}).listen(3000);