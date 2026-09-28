import http from 'node:http';
import send from './send.ts'

http.createServer((req, res) => {
    if(req.url !== '/api/health') return send(res, 404, {message: 'Recurso não encontrado.'});

    send(res, 200, {status: 'ok'})
}).listen(3000);