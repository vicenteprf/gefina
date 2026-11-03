import { Router } from "express";
import { findCustomersOptions } from "./customers.service.ts";

const router = Router();

router.get('/options', async (_req, res) => {
    const customersOptions = await findCustomersOptions();

    res.status(200).json(customersOptions)
})

export default router;