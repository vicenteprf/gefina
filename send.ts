import { ServerResponse } from "node:http"

export default function send(res: ServerResponse, statusCode: number, body: unknown): void {
    res.writeHead(statusCode, {'content-type': 'application/json'});
    res.end(JSON.stringify(body));
}