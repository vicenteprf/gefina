import type { ErrorRequestHandler } from "express";

const handleError: ErrorRequestHandler = (error, _req, res, _next) => {
    console.error(error);

    res.status(500).json({error: {
        status: 500,
        message: 'Não foi possível concluir operação.'
    }})
};

export default handleError;