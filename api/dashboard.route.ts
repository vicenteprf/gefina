import { Router } from "express";
import findDashboard from "./dashboard.service.ts";

const router = Router();

router.get('/', async (_req, res) => {
    const dashboard = await findDashboard();

    res.status(200).json(dashboard);
})

export default router;